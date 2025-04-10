import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { TextField } from "../TextField";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { Dropdown } from "../Dropdown";
interface IDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const EditProfileForm: React.FC<IDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const { user, update } = useAuth();
  const [deleteCounter, setDeleteCounter] = React.useState(0);

  const methods = useForm({
    defaultValues: {
      id: user?.id,
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      password_confirmation: "",
      addresses: user?.addresses || [],
    },
  });

  const { control, handleSubmit } = methods;

  const { fields } = useFieldArray({
    control,
    name: "addresses",
  });

  interface FormData {
    id: string | undefined;
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

    const { id, name, email, password, addresses } = methods.getValues();

    if (id) {
      await update({
        id,
        name,
        email,
        password,
        addresses: addresses.map((address) => {
          delete address.id;
          delete address.userId;
          return address;
        }),
      }).then(() => {
        methods.reset();
        handleClose();
      });
    }
  };

  const handleDelete = async () => {
    if (deleteCounter === 0) {
      setDeleteCounter(1);
      setTimeout(() => setDeleteCounter(0), 2000);
    }
    if (deleteCounter === 1) {
      setDeleteCounter(0);
      // Call the delete function here
      // await deleteUser(user?.id);
      // handleClose();
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& .MuiDialog-paper": {
            // backgroundColor: "#242424",
            color: "#f4f4f4",
            width: "100%",
            maxWidth: "1200",
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
            <Stack direction={"row"} spacing={2}>
              <Stack sx={{ flex: 1, flexGrow: 2 }}>
                <TextField
                  autoFocus
                  placeholder="Digite seu nome"
                  type="text"
                  name="name"
                />

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

                <TextField
                  placeholder="Confirme a senha"
                  type="password"
                  name="password_confirmation"
                />
              </Stack>
            </Stack>

            <Box mt={2}>
              <Stack
                direction="row"
                justifyContent="flexstart"
                alignItems="center"
              >
                <Typography variant="body1">Endereço</Typography>
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
                      <TextField
                        name={`addresses.${index}.street`}
                        placeholder="Logradouro"
                      />
                      <Box sx={{ flexGrow: 2 }}>
                        <TextField
                          name={`addresses.${index}.number`}
                          placeholder="Número"
                        />
                      </Box>
                    </Stack>
                    <TextField
                      name={`addresses.${index}.complement`}
                      placeholder="Complemento"
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ width: "100%", mt: 2, mb: 1 }}
          >
            <Button
              type="button"
              variant={deleteCounter > 0 ? "contained" : "text"}
              color="error"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px" }}
              onClick={handleDelete}
            >
              {deleteCounter === 0 ? "Excluir Usuário" : "Confirma ?"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px" }}
              onClick={handleClose}
            >
              Fechar
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px", color: "#000" }}
            >
              Atualizar dados
            </Button>
          </Stack>
        </DialogContent>
        <DevTool control={control} />
      </Dialog>
    </FormProvider>
  );
};
