
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Loader2, ExternalLink } from "lucide-react";

const BKROnlineTool = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Set a timeout to detect if iframe fails to load
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log("BKR tool iframe failed to load within timeout period");
        setIsLoading(false);
        setHasError(true);
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleIframeLoad = () => {
    console.log("BKR tool iframe loaded successfully");
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.log("BKR tool iframe error occurred");
    setIsLoading(false);
    setHasError(true);
  };

  const openInNewTab = () => {
    window.open("https://api.bkrenergy.ca/online_tool/beta_version", "_blank");
  };

  return (
    <section id="bkr-online-tool" className="py-20 bg-gradient-to-b from-black to-black/95">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-voltly-purple/20 p-3 rounded-full mb-4">
              <Calculator className="h-8 w-8 text-voltly-purple" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-voltly-purple via-voltly-green to-voltly-purple bg-clip-text text-transparent">
              Energy Assessment Tool
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Use our comprehensive energy assessment tool to evaluate your home's efficiency and discover potential savings opportunities.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-voltly-purple/20 to-transparent rounded-2xl blur-xl -z-10"></div>
            <Card className="bg-black/70 border border-voltly-purple/30 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
              <CardContent className="p-0">
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-voltly-purple mx-auto mb-4" />
                      <p className="text-gray-300">Loading energy assessment tool...</p>
                      <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
                    </div>
                  </div>
                )}

                {/* Error state with fallback */}
                {hasError && (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <Calculator className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">The assessment tool cannot be embedded directly.</p>
                      <p className="text-gray-400 text-sm mb-6">This usually happens due to security restrictions.</p>
                      <div className="space-y-3">
                        <button 
                          onClick={openInNewTab}
                          className="bg-voltly-purple hover:bg-voltly-purple/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open Assessment Tool
                        </button>
                        <button 
                          onClick={() => {
                            setHasError(false);
                            setIsLoading(true);
                          }} 
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* BKR Energy Tool Iframe */}
                <iframe
                  src="https://api.bkrenergy.ca/online_tool/beta_version"
                  className={`w-full border-0 ${isLoading || hasError ? 'hidden' : 'block'}`}
                  style={{ 
                    height: '800px',
                    minHeight: '600px'
                  }}
                  title="BKR Energy Assessment Tool"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  allow="fullscreen"
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </CardContent>
            </Card>
          </div>

          {/* Additional information */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              This tool helps you assess your home's energy efficiency and identify opportunities for improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BKROnlineTool;
