// src/components/UserDetails/UserEditModal.tsx
import { X, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  nameError?: string;
  loading: boolean;
}

export const UserEditModal = ({
  open,
  name,
  onChangeName,
  onClose,
  onSubmit,
  nameError,
  loading
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Editar Nome do Usuário</h3>
          <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Nome Completo
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              disabled={loading}
              className={nameError ? "border-red-500" : ""}
            />
            {nameError && (
              <p className="text-red-600 text-sm mt-1">{nameError}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Salvando...</span>
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
