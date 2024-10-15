import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

export function CreateAccountJotiButton({ id }: { id: string }) {
  const toast = useToast()

  const { mutate, isPending } = trpc.createAccountJoti.useMutation({
    onSuccess() {
      toast.toast({
        title: 'Sucesso',
        description: 'Membro cadastrado com sucesso',
      })
    },
    onError(err) {
      toast.toast({
        title: 'Erro',
        description: err.message,
      })
    },
  })
  return (
    <Button
      onClick={() =>
        mutate({
          id,
        })
      }
      disabled={isPending}
      variant="outline"
    >
      {isPending ? 'Carregando' : 'Cadastrar'}
    </Button>
  )
}
