chat-app/
│
├── app/
│   │
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── MessageItem.tsx
│   │   │
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── UserItem.tsx
│   │   │   └── OnlineUsers.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Loader.tsx
│   │       └── Modal.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   ├── useMessages.ts
│   │   └── useConversations.ts
│   │
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── chatStore.ts
│   │   └── socketStore.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.client.ts
│   │   ├── user.client.ts
│   │   ├── message.client.ts
│   │   └── socket.client.ts
│   │
│   ├── routes/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── chat.tsx
│   │   ├── profile.tsx
│   │   └── api/
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   │
│   ├── root.tsx
│   └── routes.ts
│
├── server/
│   │
│   ├── config/
│   │   ├── database.ts
│   │   └── socket.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Message.ts
│   │   └── Conversation.ts
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── messageController.ts
│   │   └── conversationController.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validate.ts
│   │   └── errorHandler.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── messageRoutes.ts
│   │   └── conversationRoutes.ts
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   ├── messageService.ts
│   │   └── conversationService.ts
│   │
│   ├── sockets/
│   │   ├── chatSocket.ts
│   │   └── presenceSocket.ts
│   │
│   ├── utils/
│   │   ├── generateToken.ts
│   │   └── asyncHandler.ts
│   │
│   └── index.ts
│
├── public/
│
├── .env
├── .env.example
├── package.json
├── react-router.config.ts
└── tsconfig.json