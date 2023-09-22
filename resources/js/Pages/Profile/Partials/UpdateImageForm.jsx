import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Avatar from '../../../../images/logo.png';

export default function UpadateImageForm({className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        username: user.username,
        email: user.email,
        image: user.image,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Picture</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your Profile Picture
                </p>
            </header>

            <img src={Avatar} className='profile1' />

            <form onSubmit={submit} className="mt-6 space-y-6" encType='multidata/form-data'>
                <div>
                    <InputLabel htmlFor="image" value="Profile Pic" />

                    <TextInput
                        id="image"
                        type='file'
                        className="mt-1 block w-full"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                        required
                        isFocused
                        autoComplete="image"
                    />

                    <InputError className="mt-2" message={errors.image} />
                </div>
              

                  <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Change / Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
