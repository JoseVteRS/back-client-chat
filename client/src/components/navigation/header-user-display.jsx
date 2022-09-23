import Image from 'next/image';

const HeaderUserDisplay = ({ user }) => {
	return (
		<div className='flex-c-c gap-4'>
			<div className='flexcol-c-e'>
				<span>{user.username}</span>
				<span className='text-xs'>{user.email}</span>
			</div>
			<Image
				width={48}
				height={48}
				className='rounded-full'
				alt={user.name}
				src={
					user.profilePic ||
					`https://avatars.dicebear.com/api/initials/${user.username}.svg`
				}
			/>
		</div>
	);
};

export default HeaderUserDisplay;
