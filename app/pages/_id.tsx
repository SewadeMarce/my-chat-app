import ChatHeader from "~/components/ui/ChatHeader";
import MessageForm from "~/components/ui/formMessage";
import NoChatHistoryPlaceholder from "~/components/ui/NoChatHistoryPlaceholder";
import { MessagesService, } from "~/services/data.service";
import type { Route } from "./+types/_id";
import { useEffect } from "react";
import { redirect, useNavigation, useParams } from "react-router";
import MessagesLoadingSkeleton from "~/components/ui/MessagesLoadingSkeleton";
import { useSocketContext } from "~/hooks/useHook";
import MessagesList from "~/components/ui/MessageList";
import PageLoader from "~/components/ui/PageLoader";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {

  const cached = sessionStorage.getItem(`${params._id}`)
  //if (cached) return JSON.parse(cached)

  const {
    messages,
    partners
  } = (await MessagesService.getMessagesByUserId(params._id));
  if (!partners) {
    return redirect('/chat-app')
  }
  // sessionStorage.setItem(`${params._id}`, JSON.stringify({
  //   messages,
  //   partners
  // }))
  return {
    messages,
    partners
  };
};
export async function clientAction({ params, request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const text = formData.get('text') as string;
  const image = formData.get('image') as File | null;

  if (!text?.trim() && !image) return;

  const data = await MessagesService.sendMessage({ text, image }, params._id);
  return data

}
export function HydrateFallback() {

  return (
    <MessagesLoadingSkeleton />
  )
}
clientLoader.hydrate = true as const

export default function ChatMessages({ loaderData }: Route.ComponentProps) {


  const params = useParams()
  const Socket = useSocketContext();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading'
  useEffect(() => {
    Socket.initmessages(loaderData.messages)
    Socket.initreceiverId(params._id as string)
  }, [params._id])
  if (isLoading) {
    return <PageLoader />

  }
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {Socket.messages.length > 0 ? (
          <MessagesList messages={Socket.messages} currentUserId={Socket.senderId} />

        ) : (
          <NoChatHistoryPlaceholder name={loaderData.partners.fullName} />
        )}
      </div>
      <MessageForm />
    </>
  )
}