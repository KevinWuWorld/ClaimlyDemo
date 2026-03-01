import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Upload, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { mockIntakeQuestions } from "../data/mockData";

export default function IntakeChat() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [input, setInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'question' | 'answer', text: string }>>([]);

  const progress = ((currentQuestion + 1) / mockIntakeQuestions.length) * 100;
  const question = mockIntakeQuestions[currentQuestion];

  useEffect(() => {
    if (question) {
      setChatHistory(prev => [...prev, { type: 'question', text: question.question }]);
    }
  }, [currentQuestion]);

  const handleAnswer = (answer?: string) => {
    const finalAnswer = answer || input;
    if (!finalAnswer.trim() && question.type !== 'upload') return;

    setAnswers({ ...answers, [question.id]: finalAnswer });
    setChatHistory(prev => [...prev, { type: 'answer', text: finalAnswer }]);
    setInput("");

    if (currentQuestion < mockIntakeQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && question.type !== 'textarea') {
      e.preventDefault();
      handleAnswer();
    }
  };

  const handleFinish = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with Progress */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-semibold">Case Intake</h1>
            <Badge variant="outline">{currentQuestion + 1} of {mockIntakeQuestions.length}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500 mt-2">Case Completeness: {Math.round(progress)}%</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <div className="space-y-4 mb-24">
          {chatHistory.map((message, idx) => (
            <div key={idx} className={`flex ${message.type === 'answer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] sm:max-w-[70%] rounded-lg p-4 ${
                message.type === 'question' 
                  ? 'bg-white border border-slate-200' 
                  : 'bg-blue-600 text-white'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:p-6">
          <div className="container mx-auto max-w-3xl">
            {question.type === 'options' && (
              <div className="flex flex-wrap gap-2">
                {question.options?.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                    className="hover:bg-blue-50 hover:border-blue-600"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {question.type === 'text' && (
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your answer..."
                  className="flex-1"
                  autoFocus
                />
                <Button 
                  onClick={() => handleAnswer()}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!input.trim()}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {question.type === 'date' && (
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button 
                  onClick={() => handleAnswer()}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!input}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {question.type === 'textarea' && (
              <div className="space-y-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer..."
                  rows={3}
                  autoFocus
                />
                <Button 
                  onClick={() => handleAnswer()}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  disabled={!input.trim()}
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {question.type === 'upload' && (
              <div className="space-y-3">
                <Card className="p-6 border-dashed text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600 mb-3">
                    Upload photos, medical records, or other documents (optional)
                  </p>
                  <Button variant="outline" onClick={() => setUploadedFiles([...uploadedFiles, "Document " + (uploadedFiles.length + 1)])}>
                    Choose Files
                  </Button>
                </Card>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-100 rounded p-2">
                        <span className="text-sm">{file}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  onClick={handleFinish}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Finish & See My Results
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
