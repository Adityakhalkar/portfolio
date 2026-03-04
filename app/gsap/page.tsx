"use client";

import { useState } from "react";
import Navigation from "../../components/Navigation";
import GSAPDemo from "../../components/gsap/GSAPDemo";
import { gsapTechniques } from "../../components/gsap/techniques";

export default function GSAPPage() {
  const [selectedTechnique, setSelectedTechnique] = useState(gsapTechniques[0]);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono">
      <Navigation />

      <div className="pt-24 px-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="border-b border-black dark:border-white pb-4 mb-8">
          <h1 className="text-2xl font-bold mb-2">GSAP Advanced Techniques</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Professional animation library documentation and implementation examples
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - Technique List */}
          <div className="col-span-3">
            <div className="border border-black dark:border-white">
              <div className="border-b border-black dark:border-white p-3 bg-black dark:bg-white text-white dark:text-black">
                <h2 className="text-xs font-bold uppercase tracking-wider">Techniques</h2>
              </div>
              <div className="divide-y divide-black dark:divide-white">
                {gsapTechniques.map((technique) => (
                  <button
                    key={technique.id}
                    onClick={() => {
                      setSelectedTechnique(technique);
                      setShowCode(false);
                    }}
                    className={`w-full text-left p-3 text-sm transition-colors ${
                      selectedTechnique.id === technique.id
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <div className="font-bold">{technique.name}</div>
                    <div className="text-xs mt-1 opacity-70">{technique.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="border border-black dark:border-white mt-4 p-3 text-xs">
              <div className="font-bold mb-2">METADATA</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <span>{selectedTechnique.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span>{selectedTechnique.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Plugins:</span>
                  <span>{selectedTechnique.plugins.join(", ") || "None"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {/* Technique Header */}
            <div className="border border-black dark:border-white mb-6">
              <div className="border-b border-black dark:border-white p-4 bg-black dark:bg-white text-white dark:text-black">
                <h2 className="text-xl font-bold">{selectedTechnique.name}</h2>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed">{selectedTechnique.description}</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border border-black dark:border-white mb-6">
              <div className="flex border-b border-black dark:border-white">
                <button
                  onClick={() => setShowCode(false)}
                  className={`px-6 py-3 text-sm font-bold border-r border-black dark:border-white ${
                    !showCode
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                  DEMO
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className={`px-6 py-3 text-sm font-bold ${
                    showCode
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                  CODE
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!showCode ? (
                  <GSAPDemo technique={selectedTechnique} />
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        IMPLEMENTATION
                      </div>
                      <pre className="bg-gray-50 dark:bg-gray-950 p-4 text-xs overflow-x-auto border border-gray-200 dark:border-gray-800">
                        <code>{selectedTechnique.code}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        KEY PARAMETERS
                      </div>
                      <div className="border border-black dark:border-white divide-y divide-black dark:divide-white text-xs">
                        {selectedTechnique.parameters.map((param) => (
                          <div key={param.name} className="p-3 grid grid-cols-3 gap-4">
                            <div className="font-bold">{param.name}</div>
                            <div className="col-span-2">
                              <div className="mb-1">{param.description}</div>
                              <div className="text-gray-600 dark:text-gray-400">
                                Type: {param.type} | Default: {param.default}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        USE CASES
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {selectedTechnique.useCases.map((useCase, idx) => (
                          <li key={idx}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Notes */}
            <div className="border border-black dark:border-white p-4 text-xs">
              <div className="font-bold mb-2">TECHNICAL NOTES</div>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                {selectedTechnique.notes.map((note, idx) => (
                  <div key={idx} className="flex">
                    <span className="mr-2">→</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
