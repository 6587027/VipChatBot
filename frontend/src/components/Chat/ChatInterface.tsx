// components/Chat/ChatInterface.tsx
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  chatId: string | null;
  className?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatId,
  className = ''
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat messages when chatId changes
  useEffect(() => {
    if (chatId) {
      loadChatMessages(chatId);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const loadChatMessages = async (id: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/chats/${id}/messages`);
      // const chatMessages = await response.json();
      
      // For now, load from localStorage
      const saved = localStorage.getItem(`zenith_chat_${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     messages: newMessages.map(msg => ({ role: msg.role, content: msg.content })),
      //     stream: true
      //   })
      // });

      // For now, simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));

      const aiMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        content: generateAIResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

      // Save to localStorage (replace with API call)
      if (chatId) {
        localStorage.setItem(`zenith_chat_${chatId}`, JSON.stringify(finalMessages));
      } else {
        // Create new chat
        const newChatId = `chat-${Date.now()}`;
        const chatTitle = userMessage.content.substring(0, 50);
        
        // Save chat to history
        const history = JSON.parse(localStorage.getItem('zenith_chat_history') || '[]');
        history.unshift({
          id: newChatId,
          title: chatTitle,
          preview: userMessage.content,
          timestamp: new Date(),
          unread: false
        });
        localStorage.setItem('zenith_chat_history', JSON.stringify(history));
        localStorage.setItem(`zenith_chat_${newChatId}`, JSON.stringify(finalMessages));
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        id: `msg-error-${Date.now()}`,
        content: 'ขออภัย เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง',
        role: 'system',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

   const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('สวัสดี') || input.includes('hello') || input.includes('hi')) {
      return 'สวัสดีครับ! ยินดีต้อนรับสู่ Zenith Comp AI Assistant 🎉\n\nผมพร้อมช่วยเหลือคุณในเรื่องต่าง ๆ เช่น:\n• การเขียนโปรแกรม\n• การแก้ไขปัญหาโค้ด\n• คำแนะนำด้านเทคโนโลジี\n• การเรียนรู้สิ่งใหม่ ๆ\n\nมีอะไรให้ช่วยไหมครับ? 😊';
    }
    
    if (input.includes('zenith') || input.includes('บริษัท')) {
      return 'Zenith Comp เป็นบริษัทเทคโนโลยีชั้นนำที่มุ่งเน้นการนำเสนอโซลูชันด้าน AI และการพัฒนาซอฟต์แวร์ 🚀\n\n**วิสัยทัศน์:** "Reaching the Peak of Innovation"\n**พันธกิจ:** ส่งมอบโซลูชัน AI ที่ล้ำสมัยสำหรับธุรกิจสมัยใหม่\n\nเรามุ่งมั่นที่จะเป็นผู้นำในด้านนวัตกรรมเทคโนโลยี และช่วยให้ธุรกิจต่าง ๆ เติบโตด้วยพลังของ AI ครับ! ✨';
    }
    
    if (input.includes('ช่วย') || input.includes('help') || input.includes('สามารถ')) {
      return 'ผมสามารถช่วยเหลือคุณได้หลายเรื่องครับ! 💪\n\n**🔧 การเขียนโปรแกรม**\n• อธิบายแนวคิดและภาษาโปรแกรมมิ่ง\n• ช่วยดีบักและแก้ไขโค้ด\n• แนะนำ best practices\n\n**💡 เทคโนโลยี**\n• อธิบายเทคโนโลยีใหม่ ๆ\n• แนะนำเครื่องมือและเฟรมเวิร์ก\n• วางแผน learning path\n\n**🎯 โปรเจค**\n• ช่วยวางแผนและออกแบบระบบ\n• แนะนำสถาปัตยกรรมที่เหมาะสม\n• ให้คำปรึกษาด้านการพัฒนา\n\nลองถามอะไรเฉพาะเจาะจงมาดูครับ! 😄';
    }
    
    if (input.includes('react') || input.includes('javascript') || input.includes('typescript')) {
      return '🚀 **React/JavaScript/TypeScript Development**\n\nเยี่ยมเลย! เหล่านี้เป็นเทคโนโลยีที่สำคัญมากในปัจจุบันครับ\n\n**React:**\n• Component-based architecture\n• Hooks และ State Management\n• Performance optimization\n• Modern patterns\n\n**TypeScript:**\n• Type safety และ better DX\n• Interface และ Generic types\n• Advanced type manipulation\n\n**มีคำถามเฉพาะเจาะจงไหมครับ?** เช่น:\n• ต้องการความช่วยเหลือเรื่องโค้ด?\n• อยากเรียนรู้แนวคิดใหม่ ๆ?\n• มีปัญหาที่ติดค้างอยู่?\n\nยินดีช่วยเหลือครับ! 💻✨';
    }
    
    if (input.includes('วิป') || input.includes('vip') || input.includes('phatra')) {
      return '👨‍💻 **เกี่ยวกับวิป (Phatra Wongsapsakul)**\n\nวิปเป็นนักศึกษา ICT ปี 3 → 4 จากมหาวิทยาลัยมหิดล ที่สร้างผมขึ้นมา! 🎓\n\n**ความสนใจหลัก:**\n• Frontend Development (React, TypeScript)\n• Full-stack Development\n• UI/UX Design\n• Modern Web Technologies\n\n**โปรเจคที่น่าประทับใจ:**\n• VipStore - E-commerce Platform\n• Personal Portfolio Website\n• และตอนนี้กำลังพัฒนา ChatBot นี้!\n\n        เขาเป็นคนที่มีความมุ่งมั่นและใฝ่รู้ในด้านเทคโนโลยีมากครับ! 🌟';
    }
    
    if (input.includes('python') || input.includes('ai') || input.includes('machine learning')) {
      return '🤖 **AI & Python Development**\n\nเทคโนโลยีที่กำลังเป็นที่นิยมมากในตอนนี้เลยครับ!\n\n**Python for AI:**\n• TensorFlow, PyTorch สำหรับ Machine Learning\n• Pandas, NumPy สำหรับ Data Science\n• FastAPI สำหรับ Backend Development\n• LangChain สำหรับ AI Applications\n\n**AI Technologies:**\n• Large Language Models (LLMs)\n• Computer Vision\n• Natural Language Processing\n• Generative AI\n\nต้องการเรียนรู้เรื่องไหนเป็นพิเศษไหมครับ? 🚀';
    }
    
    // Default responses
    const responses = [
      'น่าสนใจมากครับ! 🤔 ผมกำลังประมวลผลข้อมูลที่คุณส่งมา และพร้อมให้ความช่วยเหลือเพิ่มเติม\n\nมีอะไรเฉพาะเจาะจงที่ต้องการความช่วยเหลือไหมครับ?',
      'ขอบคุณสำหรับข้อมูลครับ! 😊 ผมเข้าใจสิ่งที่คุณต้องการแล้ว\n\nหากมีคำถามเพิ่มเติมหรือต้องการคำแนะนำในเรื่องใด ๆ สามารถถามมาได้เลยครับ!',
      'เยี่ยมเลยครับ! 🌟 ผมพร้อมช่วยเหลือในทุกเรื่องที่เกี่ยวข้องกับเทคโนโลยีและการพัฒนา\n\nลองบอกรายละเอียดเพิ่มเติมมาดูไหมครับ?',
      'เข้าใจแล้วครับ! 💡 เป็นเรื่องที่น่าสนใจมาก\n\nถ้าต้องการคำแนะนำเพิ่มเติมหรือมีปัญหาที่ต้องการแก้ไข บอกมาได้เลยครับ!'
    ];
    
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    const isSystem = message.role === 'system';

    if (isSystem) {
      return (
        <div key={message.id} className="flex justify-center my-4">
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm max-w-md text-center">
            {message.content}
          </div>
        </div>
      );
    }

    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
        <div className={`flex gap-3 max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isUser ? (
              <div className="w-8 h-8 bg-gradient-to-br from-zenith-orange-400 to-zenith-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">V</span>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-zenith-navy-400 to-zenith-navy-600 rounded-full flex items-center justify-center">
                <img
                  src="/assets/images/ZenithComp.png"
                  alt="AI"
                  className="w-5 h-5 object-contain"
                />
              </div>
            )}
          </div>

          {/* Message Content */}
          <div className="flex flex-col">
            <div className={`
              px-4 py-3 rounded-2xl max-w-xl lg:max-w-2xl
              ${isUser 
                ? 'bg-zenith-navy-500 text-white rounded-br-md' 
                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
              }
              shadow-sm hover:shadow-md transition-shadow duration-200
            `}>
              <div className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </div>
              {message.isStreaming && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              )}
            </div>
            <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && !isLoading ? (
          // Welcome Screen
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              {/* Logo */}
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/assets/images/ZenithComp.png"
                  alt="Zenith Comp Logo"
                  className="object-contain transition-transform hover:scale-110"
                  style={{ width: '100px', height: '80px' }}
                />
              </div>

              {/* Welcome Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ยินดีต้อนรับสู่ Zenith Comp AI
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                ผู้ช่วย AI ที่พร้อมสนับสนุนการเรียนรู้และการพัฒนาของคุณ
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setInputValue('สวัสดี! ช่วยแนะนำตัวหน่อยครับ')}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-zenith-navy-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="text-zenith-navy-600 font-semibold mb-2">👋 ทักทายและแนะนำตัว</div>
                  <div className="text-gray-600 text-sm">เริ่มต้นการสนทนาและทำความรู้จักกับ AI</div>
                </button>

                <button
                  onClick={() => setInputValue('ช่วยเขียนโค้ด React Component ให้หน่อยครับ')}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-zenith-navy-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="text-zenith-navy-600 font-semibold mb-2">💻 ช่วยเขียนโค้ด</div>
                  <div className="text-gray-600 text-sm">ขอความช่วยเหลือในการเขียนโปรแกรม</div>
                </button>

                <button
                  onClick={() => setInputValue('อธิบายเรื่อง AI และ Machine Learning ให้ฟังหน่อย')}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-zenith-navy-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="text-zenith-navy-600 font-semibold mb-2">🤖 เรียนรู้เรื่อง AI</div>
                  <div className="text-gray-600 text-sm">ศึกษาเทคโนโลยี AI และการประยุกต์ใช้</div>
                </button>

                <button
                  onClick={() => setInputValue('แนะนำ learning path สำหรับ Full-stack Developer')}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-zenith-navy-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="text-zenith-navy-600 font-semibold mb-2">🎯 บริษัท Zenith Comp</div>
                  <div className="text-gray-600 text-sm">รับคำแนะนำเกี่ยวกับบริษัท Zenith Comp</div>
                </button>
              </div>

              <p className="text-gray-500 text-sm">
                เริ่มพิมพ์ข้อความด้านล่างเพื่อเริ่มการสนทนา
              </p>
            </div>
          </div>
        ) : (
          // Messages List
          <div className="p-4 max-w-6xl mx-auto">
            {isLoading && messages.length === 0 && (
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-zenith-navy-500 border-t-transparent"></div>
                  <span>กำลังโหลดข้อความ...</span>
                </div>
              </div>
            )}
            
            {messages.map(renderMessage)}
            
            {isStreaming && (
              <div className="flex justify-start mb-6">
                <div className="flex gap-3 max-w-4xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-zenith-navy-400 to-zenith-navy-600 rounded-full flex items-center justify-center">
                    <img
                      src="/assets/images/ZenithComp.png"
                      alt="AI"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600 text-sm mr-2">กำลังพิมพ์...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-zenith-navy-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-zenith-navy-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                        <div className="w-2 h-2 bg-zenith-navy-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end gap-3">
            {/* File Upload Button */}
            <button className="flex-shrink-0 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์ข้อความของคุณที่นี่..."
                rows={1}
                disabled={isLoading}
                className="
                  w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200
                  rounded-2xl focus:outline-none focus:ring-2 focus:ring-zenith-navy-500 
                  focus:border-transparent transition-all duration-200
                  resize-none max-h-32 min-h-[52px]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                style={{ 
                  lineHeight: '1.5'
                }}
              />

              {/* Emoji Button */}
              <button className="absolute right-3 bottom-3 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="
                flex-shrink-0 p-3 bg-zenith-navy-500 text-white rounded-2xl
                hover:bg-zenith-navy-600 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
                disabled:hover:transform-none disabled:hover:shadow-none
              "
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="flex items-center justify-between mt-2 px-1">
            <div className="text-xs text-gray-500">
              กด Enter เพื่อส่ง • Shift + Enter เพื่อขึ้นบรรทัดใหม่
            </div>
            {inputValue.length > 1800 && (
              <div className="text-xs text-orange-500">
                {2000 - inputValue.length} ตัวอักษรเหลือ
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};