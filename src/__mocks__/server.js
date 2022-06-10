import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Configures a request mocking servers with the giben request handlers.
export const server = setupServer(...handlers)