import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "../TextField";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

interface IDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const LoginForm: React.FC<IDialogProps> = ({ isOpen, handleClose }) => {
  const [newUser, setNewUser] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (newUser) {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      }).catch((error) => {
        console.error("Error during sign up:", error);
        // Handle error (e.g., show a message to the user)
      });
    } else {
      await signIn({
        email: data.email,
        password: data.password,
      });
    }
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        component="form"
        open={isOpen}
        onClose={handleClose}
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#242424",
            color: "#f4f4f4",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "14px",
          },
        }}
      >
        <DialogTitle align="center" fontSize={24}>
          Bem Vindo
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // gap: 0,
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              {newUser && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextField
                    autoFocus
                    placeholder="Digite seu nome"
                    type="text"
                    name="name"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <TextField placeholder="Digite seu e-mail" name="email" />

            <TextField
              placeholder="Digite sua senha"
              type="password"
              name="password"
            />

            <AnimatePresence mode="wait">
              {newUser && (
                <motion.div
                  key="password_confirmation"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextField
                    placeholder="Confirme sua senha"
                    type="password"
                    name="password_confirmation"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 1, height: "40px", color: "#000" }}
          >
            Entrar
          </Button>

          <Button
            type="button"
            variant="text"
            fullWidth
            onClick={() => setNewUser(!newUser)}
            sx={{
              fontSize: "12px",
              textTransform: "none",
              color: "#fff",
              height: "40px",
            }}
          >
            {newUser ? "Já tenho cadastro" : "Realizar meu cadastro"}
          </Button>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
