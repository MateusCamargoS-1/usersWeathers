import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  deleting: boolean;
  error?: string | null;
  userName?: string;
}

export const DeleteUserDialog = ({
  open,
  onOpenChange,
  onConfirm,
  deleting,
  error,
  userName
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-bold mb-4">Confirmar exclusão</Dialog.Title>
          <Dialog.Description className="mb-4">
            Tem certeza que deseja excluir o usuário <strong>{userName}</strong>? Essa ação não poderá ser desfeita.
          </Dialog.Description>

          {error && <p className="mb-4 text-sm text-red-600 font-semibold">{error}</p>}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm} disabled={deleting}>
              {deleting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Excluir"
              )}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
