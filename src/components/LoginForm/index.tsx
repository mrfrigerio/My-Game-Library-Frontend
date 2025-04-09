import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { TextField } from "../TextField";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { Dropdown } from "../Dropdown";
interface IDialogProps {
  isOpen: boolean;
  handleClose: () => void;
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
      addresses: [
        {
          street: "",
          city: "",
          state: "",
          type: "",
          zip_code: "",
          neighborhood: "",
          number: "",
          complement: "",
        },
      ],
    },
  });

  const { control, handleSubmit } = methods;

  const { fields } = useFieldArray({
    control,
    name: "addresses",
  });

  interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    addresses: {
      street: string;
      city: string;
      state: string;
      type: string;
      zip_code: string;
      neighborhood: string;
      number: string;
      complement: string;
    }[];
  }

  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (newUser) {
      await signUp(data).catch((error) => {
        console.error("Error during sign up:", error);
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
        open={isOpen}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        keepMounted
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#242424",
            color: "#f4f4f4",
            width: "100%",
            maxWidth: () => (newUser ? "1200" : "400px"),
            borderRadius: "14px",
            overflow: "hidden",
            maxHeight: "90vh",
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
              overflow: "auto",
            }}
          >
            <Stack
              direction={newUser ? "row" : "column"}
              spacing={newUser ? 2 : 0}
            >
              <Stack sx={{ flex: 1, flexGrow: newUser ? 2 : 0 }}>
                {newUser && (
                  <TextField
                    autoFocus
                    placeholder="Digite seu nome"
                    type="text"
                    name="name"
                  />
                )}

                <TextField
                  autoFocus
                  placeholder="Digite seu e-mail"
                  name="email"
                />
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <TextField
                  placeholder="Digite sua senha"
                  type="password"
                  name="password"
                />

                {newUser && (
                  <TextField
                    placeholder="Confirme a senha"
                    type="password"
                    name="password_confirmation"
                  />
                )}
              </Stack>
            </Stack>

            {newUser && (
              <Box mt={2}>
                <Stack
                  direction="row"
                  justifyContent="flexstart"
                  alignItems="center"
                >
                  <Typography variant="body1">Endereço</Typography>
                  {/* <IconButton
                    size="small"
                    onClick={() =>
                      append({
                        street: "",
                        city: "",
                        state: "",
                        type: "",
                        zip_code: "",
                        neighborhood: "",
                        number: "",
                        complement: "",
                      })
                    }
                  >
                    <AddIcon sx={{ color: "#fff" }} />
                  </IconButton> */}
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  {fields.map((field, index) => (
                    <Box key={field.id} sx={{ flex: 1 }}>
                      <Stack
                        // mt={2}
                        direction={"row"}
                        alignItems={"end"}
                        justifyContent={"stretch"}
                        spacing={2}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Dropdown
                            control={methods.control}
                            values={["Residencial", "Comercial"]}
                            name={`addresses.${index}.type`}
                            placeholder="Tipo (residencial/comercial)"
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            name={`addresses.${index}.zip_code`}
                            placeholder="CEP"
                          />
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <TextField
                          name={`addresses.${index}.state`}
                          placeholder="Estado"
                        />
                        <Box>
                          <TextField
                            name={`addresses.${index}.city`}
                            placeholder="Cidade"
                          />
                        </Box>
                        <Box>
                          <TextField
                            name={`addresses.${index}.neighborhood`}
                            placeholder="Bairro"
                          />
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Box sx={{ flexGrow: 2 }}>
                          <TextField
                            name={`addresses.${index}.street`}
                            placeholder="Logradouro"
                          />
                        </Box>
                        <TextField
                          name={`addresses.${index}.number`}
                          placeholder="Número"
                        />
                      </Stack>
                      <TextField
                        name={`addresses.${index}.complement`}
                        placeholder="Complemento"
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ width: "100%", mt: 2, mb: 1 }}
          >
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px" }}
              onClick={() => {
                methods.setFocus("email");
                methods.reset();
              }}
            >
              Limpar dados
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px", color: "#000" }}
            >
              {newUser ? "Cadastrar" : "Entrar"}
            </Button>
          </Stack>
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
