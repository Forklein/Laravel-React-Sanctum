import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';
import ModalComponent from '../helper/ModalComponent';

export default function Profile() {
    const { user } = useAuth();

    let formattedDate = moment(user.created_at).format('D MMMM YYYY');

    return (
        <>
            <div className="text-12xl font-bold text-slate-600">User Profile</div>
            <hr className="bg-slate-400 h-1 w-full my-4" />
            <div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                <h5 className="my-2 text-2xl font-bold tracking-tight">
                    Name: {user.name}
                </h5>
                <p className="font-normal text-gray-700">Email: {user.email}</p>
                <p className="font-normal text-gray-700">
                    Created At: {formattedDate}
                </p>
                <ModalComponent cta={'Modifica'} title={'Dati utente'} user={user} />
            </div>
        </>
    );
}
