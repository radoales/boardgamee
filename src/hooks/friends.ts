import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { User } from '../types/user'
import { useAuth } from '../auth/AuthUserprovider'
import { restApiRequest } from '../utils/api'
import { Invitation } from '../models/invitation'

export const UseGetUserFriendsById = (
  user_id: string
): {
  data?: User[]
  isLoading: boolean
} => {
  const [data, setData] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(true)

  const getUsersData = async () => {
    try {
      const invitationsResponse = await restApiRequest<Invitation[]>({
        url: `invitations/${user_id}`
      })

      const userIds = invitationsResponse
        .filter((invite) => invite.status === 1)
        .map((invite) =>
          invite.sender_id === user_id ? invite.receiver_id : invite.sender_id
        )

      const response = await restApiRequest<{ ids: string[] }, User[]>({
        url: `users_by_ids`,
        method: 'POST',
        data: {
          ids: userIds
        }
      })
      setData(response)
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    if (user_id) {
      getUsersData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id])

  return { data, isLoading }
}

export const UseUpdateInvitation = () => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const [data, setData] = useState<Invitation>()

  const updateInvitation = async (id: string, status: 0 | 1 | 2) => {
    setIsSuccess(undefined)
    setIsError(undefined)

    try {
      const response = await restApiRequest<Partial<Invitation>, Invitation>({
        url: 'invitations',
        method: 'PUT',
        data: { id, status }
      })
      setData(response)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      setError(error as string)
    }
  }

  return { updateInvitation, isSuccess, isError, error, data }
}

export const UseGetUserInvitationsById = (
  user_id: string
): {
  data?: Invitation[]
  isLoading: boolean
} => {
  const [data, setData] = useState<Invitation[]>()
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await restApiRequest<Invitation[]>({
        url: `invitations/${user_id}`
      })
      setData(response)
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    if (user_id) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id])

  return { data, isLoading }
}

export const UseAcceptInvite = () => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()

  const { user: loggedUser } = useAuth()

  const accept = (id: string) => {
    setIsSuccess(undefined)
    setIsError(undefined)
    const db = getDatabase()

    const dbRef = ref(db, `users/${id}/accountDetails`)
    onValue(dbRef, (snapshot) => {
      const user: User = snapshot.val()
      if (user) {
        set(
          ref(db, `users/${loggedUser.id}/friends/${user.id}/accountDetails`),
          user
        )
          .then(() => {
            set(ref(db, `users/${loggedUser.id}/invites/${user.id}`), null)
            set(ref(db, `users/${user.id}/invites/${user.id}`), null)
            setIsSuccess(true)
          })
          .catch((error) => {
            setIsError(true)
            setError(error)
          })
      }
    })
  }

  return { accept, isSuccess, isError, error }
}
