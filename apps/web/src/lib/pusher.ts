import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

const globalForPusherServer = globalThis as unknown as { pusher: PusherServer }

export const pusherServer = globalForPusherServer.pusher || new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: 'ap2',
  useTLS: true,
})

const globalForPusherClient = globalThis as unknown as { pusher: PusherClient }

export const pusherClient = globalForPusherClient.pusher || new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'ap2',
  }
)

