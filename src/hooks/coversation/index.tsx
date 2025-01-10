import {getData, mutationPost} from '@config/api'
import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useMutation, useQuery} from '@tanstack/react-query'
import {tConversationItem} from './conversation.interface'

type tGetEncryptKeyParam = {
  publicKey: string
  conversationId: string
}
export const useGetEncryptKey = () => {
  return useMutation({
    mutationFn: (params: tGetEncryptKeyParam) =>
      mutationPost<IResponse<string>>({
        url: `${`/conversation/{conversation_id}/encrypt-key`.replace(
          '{conversation_id}',
          params.conversationId,
        )}`,
        body: {
          publicKey: params.publicKey,
        },
      }),
  })
}

type useGetConversationContentResponse = IResponse<tConversationItem[]>

export const useGetConversationContent = (conversationId: string) => {
  const url = apiPath.conversation.GET_CONTENT.replace(
    '{conversation_id}',
    conversationId,
  )
  return useQuery<useGetConversationContentResponse>({
    queryKey: ['useGetConversationContent', conversationId],
    queryFn: () => getData<useGetConversationContentResponse>(url),
    gcTime: 0,
  })
}
