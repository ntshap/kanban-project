/**
 * Utility functions for authentication
 */
import { retrieveData, storeData, removeData } from "./localStorage"

// Constants
const TOKEN_KEY = "admin_token"
const USER_KEY = "admin_user"
const TOKEN_EXPIRY_KEY = "admin_token_expiry"

// Login user
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Get users from localStorage
      const users = retrieveData("admin_users", [])

      // Find user with matching email and password
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (user) {
        // Create token and expiry (24 hours from now)
        const token = generateToken()
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000

        // Store in localStorage
        storeData(TOKEN_KEY, token)
        storeData(TOKEN_EXPIRY_KEY, expiryTime)

        // Store user info (without password)
        const { password: _, ...userWithoutPassword } = user
        storeData(USER_KEY, userWithoutPassword)

        resolve({
          user: userWithoutPassword,
          token,
          expiresAt: expiryTime,
        })
      } else {
        reject(new Error("Invalid email or password"))
      }
    }, 800)
  })
}

// Logout user
export const logoutUser = () => {
  removeData(TOKEN_KEY)
  removeData(USER_KEY)
  removeData(TOKEN_EXPIRY_KEY)
}

// Check if user is logged in
export const isAuthenticated = () => {
  const token = retrieveData(TOKEN_KEY)
  const expiryTime = retrieveData(TOKEN_EXPIRY_KEY)

  if (!token || !expiryTime) {
    return false
  }

  // Check if token has expired
  const now = new Date().getTime()
  if (now > expiryTime) {
    // Token expired, clear data
    logoutUser()
    return false
  }

  return true
}

// Get current user
export const getCurrentUser = () => {
  if (!isAuthenticated()) {
    return null
  }

  return retrieveData(USER_KEY)
}

// Get auth token
export const getToken = () => {
  if (!isAuthenticated()) {
    return null
  }

  return retrieveData(TOKEN_KEY)
}

// Refresh token
export const refreshToken = () => {
  if (!isAuthenticated()) {
    return false
  }

  // Extend expiry by 24 hours
  const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000
  storeData(TOKEN_EXPIRY_KEY, expiryTime)

  return true
}

// Generate a random token
const generateToken = () => {
  return "token_" + Math.random().toString(36).substr(2) + Date.now().toString(36)
}

// Update user profile
export const updateUserProfile = (userData) => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      try {
        const currentUser = getCurrentUser()

        if (!currentUser) {
          reject(new Error("User not authenticated"))
          return
        }

        // Update user in localStorage
        const users = retrieveData("admin_users", [])
        const updatedUsers = users.map((user) => (user.id === currentUser.id ? { ...user, ...userData } : user))

        storeData("admin_users", updatedUsers)

        // Update current user in localStorage
        const updatedUser = { ...currentUser, ...userData }
        storeData(USER_KEY, updatedUser)

        resolve(updatedUser)
      } catch (error) {
        reject(error)
      }
    }, 800)
  })
}

// Change password
export const changePassword = (currentPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      try {
        const currentUser = getCurrentUser()

        if (!currentUser) {
          reject(new Error("User not authenticated"))
          return
        }

        // Get users from localStorage
        const users = retrieveData("admin_users", [])
        const user = users.find((u) => u.id === currentUser.id)

        // Verify current password
        if (!user || user.password !== currentPassword) {
          reject(new Error("Current password is incorrect"))
          return
        }

        // Update password
        const updatedUsers = users.map((u) => (u.id === currentUser.id ? { ...u, password: newPassword } : u))

        storeData("admin_users", updatedUsers)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    }, 800)
  })
}

