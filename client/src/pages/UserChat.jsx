import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";

import Logo from "../components/Logo";
import CustomSearchBar from "../components/CustomSearchBar";
import ChatLauncher from "../components/ChatLauncher";
import Notificationlogo from "../components/Notificationlogo";
import SideBar from "./SideBar";

import api from "../api/axios";

const UserChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const chatBottomRef = useRef(null);

  const me = JSON.parse(localStorage.getItem("user")); // logged user

  // Load conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const res = await api.get("/api/conversations");
        setConversations(res.data);
      } catch (err) {
        console.log("Conversation load error:", err);
      }
    };
    loadConversations();
  }, []);

  // Load messages when selecting chat
  useEffect(() => {
    if (!selectedChat) return;

    const loadMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${selectedChat._id}`);

        setChatMessages(res.data);
      } catch (err) {
        console.log("Message load error:", err);
      }
    };

    loadMessages();
  }, [selectedChat]);

  // Auto-scroll
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, selectedChat]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !selectedChat) return;

    try {
      const res = await api.post("/api/messages", {
        conversationId: selectedChat._id,
        text: input,
      });

      setChatMessages(prev => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.log("Send message error:", err);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box className="header">
        <Logo />
        <CustomSearchBar />
        <Box className="noti-chat">
          <Notificationlogo />
          <ChatLauncher />
        </Box>
      </Box>

      {/* MAIN LAYOUT */}
      <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
        <Box className="left-sidebar">
          <SideBar />
        </Box>

        {/* CHAT LIST PANEL */}
        <Box
          sx={{
            ml: 1,
            mb: 1,
            mr: 1,
            width: 325,
            bgcolor: "#ffffff",
            display: "flex",
            borderRadius: 2,
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid #ddd" }}>
            <Typography variant="h6" fontWeight="bold">
              Messages
            </Typography>
          </Box>

          <Box sx={{ mt: 1, px: 2, py: 1 }}>
            <TextField
              fullWidth
              placeholder="Search"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "22px" },
              }}
            />
          </Box>

          {/* Conversations */}
          <List
            sx={{
              overflowY: "auto",
              flex: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {conversations.map(conv => {
              const otherUser = conv.members.find(m => m._id !== me._id);

              return (
                <ListItem
                  button
                  key={conv._id}
                  selected={selectedChat?._id === conv._id}
                  onClick={() => setSelectedChat(conv)}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    mb: 1,
                    "&.Mui-selected": { bgcolor: "#e3f2fd" },
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={otherUser?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={otherUser?.name}
                    secondary={conv.lastMessage?.text || "Tap to chat"}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* RIGHT CHAT WINDOW */}
        <Box
          sx={{
            mr: 1,
            mb: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!selectedChat ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f7fa",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="gray">
                Select a chat to start messaging…
              </Typography>
            </Box>
          ) : (
            <>
              {/* HEADER */}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "#ffffff",
                  borderBottom: "1px solid #ddd",
                  borderTopLeftRadius: 7,
                  borderTopRightRadius: 7,
                }}
              >
                <Avatar />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {selectedChat.members.find(m => m._id !== me._id)?.name}
                  </Typography>
                  <Typography variant="caption" color="green">
                    Online
                  </Typography>
                </Box>
              </Box>

              {/* MESSAGES */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  overflowY: "auto",
                  bgcolor: "#e8ecf0",
                }}
              >
                {chatMessages.map(msg => (
                  <Box
                    key={msg._id}
                    sx={{
                      display: "flex",
                      borderRadius: 3,
                      justifyContent:
                        msg.sender === me._id ? "flex-end" : "flex-start",
                      mb: 2,
                    }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        maxWidth: "65%",
                        bgcolor: msg.sender === me._id ? "#cfe9ff" : "#fff",
                      }}
                    >
                      <Typography>{msg.text}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ mt: 0.5, opacity: 0.6, display: "block" }}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Paper>
                  </Box>
                ))}

                <div ref={chatBottomRef}></div>
              </Box>

              {/* INPUT BOX */}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#ffffff",
                  borderTop: "1px solid #ddd",
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
                />
                <IconButton color="primary" onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserChat;
