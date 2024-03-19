import React from "react";
import Container from "./Container";

function Testimonial({ name, role, avatarSrc, content }) {
  return (
    <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
      <div className="flex gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={avatarSrc}
          alt={`${name} avatar`}
          loading="lazy"
        />
        <div>
          <h6 className="text-lg font-medium text-gray-700 dark:text-white">
            {name}
          </h6>
          <p className="text-sm text-gray-500 dark:text-gray-300">{role}</p>
        </div>
      </div>
      <p className="mt-8">{content}</p>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Smith",
      role: "Mobile dev",
      avatarSrc: "./images/avatars/avatar1.webp",
      content:
        "PayChatAI revolutionized my approach to online engagement! With its intuitive interface and powerful AI capabilities, I effortlessly created chat models that now generate income for me. It's like having a personal assistant handling customer queries 24/7. Highly recommend!",
    },
    {
      name: "Max Johnson",
      role: "Marketing",
      avatarSrc: "./images/avatars/avatar2.webp",
      content:
        "I stumbled upon PayChatAI while searching for ways to monetize my AI creations, and I'm thrilled with the results! The platform's seamless integration and easy setup allowed me to launch my chat models in no time. Now, I'm earning passive income while my bots handle conversations autonomously. Thanks, PayChatAI!",
    },
    {
      name: "Emily Chen",
      role: "Developer",
      avatarSrc: "./images/avatars/avatar3.webp",
      content:
        "As a freelance developer, PayChatAI has become my go-to platform for building and selling AI chat models. Its robust features and customizable options make it a breeze to tailor chatbots to specific industries and use cases. Plus, the ability to sell my creations has opened up new revenue streams for me. Kudos to the PayChatAI team!",
    },
    {
      name: "Eva Nguyen",
      role: "Mobile dev",
      avatarSrc: "./images/avatars/avatar4.webp",
      content:
        "PayChatAI exceeded my expectations in every way! Not only did I create sophisticated chat models effortlessly, but I also found a lucrative avenue for monetization. The platform's user-friendly interface and responsive support team made the entire process seamless. If you're looking to profit from your AI creations, look no further than PayChatAI!",
    },
    {
      name: "Lily Wang",
      role: "Manager",
      avatarSrc: "./images/avatars/avatar5.webp",
      content:
        "I've tried several AI platforms, but PayChatAI stands out for its simplicity and profitability. With just a few clicks, I was able to build and deploy chat models that now generate steady income for me. Whether you're a seasoned developer or a novice, PayChatAI offers the tools and support you need to succeed in the AI marketplace.",
    },
    {
      name: "Alex Rodriguez",
      role: "E-commerce Entrepreneur",
      avatarSrc: "./images/avatars/avatar6.webp",
      content:
        "I never knew AI could be so profitable until I discovered PayChatAI! As an e-commerce entrepreneur, I needed a solution to handle customer inquiries efficiently. PayChatAI not only met but exceeded my expectations. Now, my AI chat models not only assist customers but also drive sales and boost conversions. It's a game-changer for my business!",
    },
  ];

  return (
    <div className="text-gray-600 dark:text-gray-300" id="testimonials">
      <Container>
        <div className="mb-20 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            We have some fans.
          </h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default TestimonialsSection;
