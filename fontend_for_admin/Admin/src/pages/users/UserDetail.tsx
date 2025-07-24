import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageBreadcrumb } from '../../components'
import { fetchUserById, UserResponse, userStatistics } from './data'

const UserOverview = () => {
  return (
    <div className="lg:col-span-3">
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">User Overview</h6>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {(userStatistics || []).map((stat, idx) => (
              <div className="flex items-center gap-5" key={idx}>
                <i className={`${stat.icon} text-5xl h-10 w-10`}></i>
                <div>
                  <h4 className="text-lg text-gray-700 dark:text-gray-300 font-medium">{stat.count}</h4>
                  <span className="text-sm">{stat.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


const AboutUser = ({ user }: { user: UserResponse }) => {
  return (
    <div className="lg:col-span-3">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">About User</h4>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <h5 className="font-medium text-gray-700">{user.firstName} {user.lastName}</h5>
            </div>
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <h5 className="font-medium text-gray-700">{user.username}</h5>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h5 className="font-medium text-gray-700">{user.email}</h5>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <h5 className="font-medium text-gray-700">{user.phone || 'N/A'}</h5>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <h5 className="font-medium text-gray-700">{user.address || 'N/A'}</h5>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <h5 className="font-medium text-gray-700">{user.dob ? new Date(user.dob.toString()).toLocaleDateString() : 'N/A'}</h5>
            </div>
          </div>

          <div className="mt-6">
            <h6 className="text-sm text-gray-800 font-medium mb-2">Role</h6>
            <p className="font-semibold text-primary">{user.role.role}</p>
            <p className="text-sm text-gray-500">{user.role.description}</p>

            {user.role.permissions && (
              <div className="mt-4">
                <h6 className="text-sm text-gray-800 font-medium mb-2">Permissions</h6>
                <ul className="list-disc ps-5 text-sm text-gray-600">
                  {user.role.permissions.map((perm, idx) => (
                    <li key={idx}>
                      <strong>{perm.permission}</strong>: {perm.description || 'No description'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchUserById(id)
        .then(data => setUser(data))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (!user) return <div className="text-center py-10 text-red-500">User not found</div>

  return (
    <>
      <PageBreadcrumb name="User Detail" title="User Detail" breadCrumbItems={["Fitmate", "Users", "User Detail"]} />
      <div className="grid lg:grid-cols-3 gap-6">
        <UserOverview />
        <AboutUser user={user} />
      </div>
    </>
  )
}

export default UserDetail
