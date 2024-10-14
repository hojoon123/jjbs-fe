// src/components/mypage/profile/EditProfileForm.tsx
// 'use client'

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { userApi } from "@/services/api/userApi"
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

// export function EditProfileForm() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await userApi.getUserProfile();
//         setName(data.username);
//         setEmail(data.email);
//       } catch (error) {
//         console.error('Failed to fetch profile:', error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       await userApi.updateUserProfile({ username: name, email: email });
//       router.push('/users/profile');
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//       <div className="mb-4">
//         <Label htmlFor="name">이름</Label>
//         <Input
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mt-1"
//         />
//       </div>
//       <div className="mb-4">
//         <Label htmlFor="email">이메일</Label>
//         <Input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mt-1"
//         />
//       </div>
//       <Button type="submit" className="w-full">저장</Button>
//     </form>
//   )
// }