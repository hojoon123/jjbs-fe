'use client'

import Link from 'next/link';

interface UserProfile {
  username: string;
  email: string;
  userprofile: {
    subscription_plan: string;
  };
}

interface ProfileSectionProps {
  userData: UserProfile;
}

export function ProfileSection({ userData }: ProfileSectionProps) {
  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-200 text-gray-700';
      case 'basic':
        return 'bg-blue-200 text-blue-700';
      case 'pro':
        return 'bg-purple-200 text-purple-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">프로필</h2>
      <div className="mb-4">
        <p className="font-medium">이름: {userData.username}</p>
        <p className="text-gray-600">이메일: {userData.email}</p>
      </div>
      <div className="mb-4">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSubscriptionColor(userData.userprofile.subscription_plan)}`}>
          {userData.userprofile.subscription_plan.toUpperCase()}
        </span>
      </div>
      <Link href="/users/profile/edit" className="text-blue-600 hover:underline">
        프로필 수정
      </Link>
    </div>
  )
}