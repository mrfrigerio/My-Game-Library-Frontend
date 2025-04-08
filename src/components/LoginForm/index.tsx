import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { RHTextField } from "../RHTextField";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../context/Auth";

interface IDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  // showDateInput?: boolean
}

export const LoginForm: React.FC<IDialogProps> = ({ isOpen, handleClose }) => {
  const [newUser, setNewUser] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: any) => {
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
        <DialogContent sx={{ alignItems: "center", justifyContent: "center" }}>
          {/* <DialogContentText>{dialogText}</DialogContentText> */}
          {newUser && (
            <RHTextField
              autoFocus
              placeholder="Digite seu nome"
              type="text"
              // fullWidth
              name="name"
            />
          )}
          <RHTextField
            placeholder="Digite seu e-mail"
            // fullWidth
            name="email"
          />
          <RHTextField
            placeholder="Digite sua senha"
            type="password"
            // fullWidth
            name="password"
          />
          {newUser && (
            <RHTextField
              placeholder="Confirme sua senha"
              type="password"
              // fullWidth
              name="password_confirmation"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={false}
            fullWidth
            sx={{ mt: 2, mb: 1, height: "40px", color: "#000" }}
          >
            Entrar
          </Button>
          <Button
            type="button"
            variant="text"
            disabled={false}
            disableRipple
            fullWidth
            onClick={() => setNewUser(!newUser)}
            sx={{
              fontSize: "12px",
              textTransform: "none",
              color: "#fff",
              height: "40px",
            }}
          >
            {newUser ? "Já tenho cadastro" : "Não tenho cadastro"}
          </Button>
        </DialogContent>
        {/* <DialogActions>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={false}
            fullWidth
            sx={{ display: "flex", margin: "0 15px 20px 15px" }}
          >
            Entrar
          </Button>
        </DialogActions> */}
      </Dialog>
    </FormProvider>
  );
};
