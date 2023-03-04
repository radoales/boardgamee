import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { User } from '../types/user'
import { firebaseApp } from '../../firebaseConfig'
import { useAuth } from '../auth/AuthUserprovider'
import { Invite } from '../types/invite'
import { restApiRequest } from '../utils/api'

export const UseGetUsers = (): { data?: User[]; isLoading: boolean } => {
  const [data, setData] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await restApiRequest<User[]>({ url: `users}` })
      setData(response)
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [])

  return { data, isLoading }
}

export const UseGetUserFriendsById = (
  id: string
): {
  data?: User[]
  isLoading: boolean
} => {
  const [data, setData] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, `users/${id}/friends`)
    onValue(dbRef, (snapshot) => {
      const data: { [key: string]: { accountDetails: User } } = snapshot.val()
      setData(Object.values(data).map((user) => user.accountDetails))
      setIsLoading(false)
    })
  }, [id])

  return { data, isLoading }
}

export const UseGetUserById = (id: string): { data?: User } => {
  const [data, setData] = useState<User>()
  const getData = async (id: string) => {
    try {
      const response = await restApiRequest<User[]>({ url: `users/${id}` })
      setData(response[0])
    } catch (error) {}
  }

  useEffect(() => {
    if (id) {
      getData(id)
    }
  }, [id])

  return { data }
}

export const UseUpdateUser = () => {
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const updateUser = (id: string, name: string, email: string) => {
    setIsSuccess(undefined)
    setIsError(undefined)
    restApiRequest<Partial<User>>({
      url: 'users',
      method: 'PUT',
      data: { id, name, email, username: name }
    })
      .then(() => {
        setIsSuccess(true)
      })
      .catch((error) => {
        setIsError(true)
        setError(error)
      })
  }

  return { updateUser, isSuccess, isError, error }
}

export const UseGetUserInvitesById = (
  id: string
): {
  data?: Invite[]
  isLoading: boolean
} => {
  const [data, setData] = useState<Invite[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, `users/${id}/invites`)
    onValue(dbRef, (snapshot) => {
      const data: {
        [key: string]: Invite
      } = snapshot.val()
      setData(
        data
          ? Object.values(data)
              .filter((invite) => invite.status === 'received')
              .map((invite) => invite)
          : []
      )
      setIsLoading(false)
    })
  }, [id])

  return { data, isLoading }
}

export const UseGetUserInviteById = (
  userId: string,
  inviteId: string
): {
  data?: {
    [key: string]: {
      id: string
      name: string
      username: string
      status: string
    }
  }
  isLoading: boolean
} => {
  const [data, setData] = useState<{
    [key: string]: {
      id: string
      name: string
      username: string
      status: string
    }
  }>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db, `users/${userId}/invites/${inviteId}`)
    onValue(dbRef, (snapshot) => {
      const data: {
        [key: string]: {
          id: string
          name: string
          username: string
          status: string
        }
      } = snapshot.val()
      setData(data)
      setIsLoading(false)
    })
  }, [inviteId, userId])

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
