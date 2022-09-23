import Link from 'next/link';
import { useProfile } from '../../hooks/api/users';
import LinkButton from '../atoms/link-button';
import HeaderUserDisplay from './header-user-display';

const Header = () => {
	const { data } = useProfile();

	return (
		<header className='flex-sb-c h-16 px-4 bg-neutral-900 text-white'>
			<Link href='/'>
				<a className='flex-s-c gap-2'>
					<span className='flex-c-c h-10 w-10 bg-indigo-500 text-white font-bold rounded'>
						MS
					</span>
					<span className='text-lg font-bold'>Chat</span>
				</a>
			</Link>
			<Link href='/auth'>Auth</Link>
			<Link href='/login'>Login</Link>
			<Link href='/teststatic'>Static</Link>
			<Link href='/chat'>Chat</Link>
			{data ? (
				<HeaderUserDisplay user={data.user} />
			) : (
				<LinkButton href='/login' size='small'>
					Login
				</LinkButton>
			)}
		</header>
	);
};

export default Header;
