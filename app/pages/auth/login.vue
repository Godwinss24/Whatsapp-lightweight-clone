<script setup lang='ts'>
import { getAuth, signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'vue-sonner';
import type { User } from '~/interfaces/user';
import * as z from 'zod';
import { useForm, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const schema = z.object({
	email: z.string({ message: 'Email cannot be empty' }).email('Provide a valid email'),
	password: z.string({ message: 'Password cannot be empty' }).min(8, 'Must be at least 8 characters').regex(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
		'Password must contain uppercase, lowercase, number, and special character'),
});

type Schema = z.output<typeof schema>;

const initialValues: Schema = {
	email: '',
	password: '',
};

const { handleSubmit, isSubmitting } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues,
});

const isLoading = ref(false);

const passwordFieldType = ref('text');

const togglePasswordType = () => {
	if(passwordFieldType.value === 'text'){
		passwordFieldType.value = 'password';
	}else {
		passwordFieldType.value = 'text';
	}
};

const { createUser, findUserByEmail } = useFirebase();

const initiateLoginWithGoogle = async () => {
	isLoading.value = true;

	try {
		const { $app, $db } = useNuxtApp();

		const auth = getAuth($app);

		const provider = new GoogleAuthProvider();

		const userCredentials = await signInWithPopup(auth, provider);

		if (!userCredentials.user.email) {
			toast.error('Oops', { description: 'Email not found' });

			isLoading.value = false;

			return;
		}

		const data:User = {
			email: userCredentials.user.email,
			displayName: userCredentials.user.displayName,
			password: null,
			profilePicture: userCredentials.user.photoURL,
		};

		const querySnapshot = await findUserByEmail($db, userCredentials.user.email);

		const users = querySnapshot.docs;
    
		if (users.length > 0) {
			toast.success('Login Successful', {
				description: `Welcome ${userCredentials.user.displayName?.split(' ')[0]}`
			});

			await navigateTo('/');
            
			return;
		} else {
			await createUser($db, data);
		}

		toast.success('Login Successful', {
			description: `Welcome ${userCredentials.user.displayName?.split(' ')[0]}`
		});
      
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error:any) {
		toast.error(error.message);
	}
	finally{ 
		isLoading.value = false;
	}
};

const onSubmit = handleSubmit(
	async (data:Schema) => {
		const { email,password } = data;

		try {
			const {  $db } = useNuxtApp();
 
			const querySnapshot = await findUserByEmail($db, email);

			if (!querySnapshot.empty) {
				const doc = querySnapshot.docs[0];

				const user = doc?.data();

				// ✅ Add password check here
				if (user?.password === password) {
					toast.success('Login successful', {
						description: `Welcome ${user.displayName?.split(' ')[0] || 'back'}`,
            
					});

					await navigateTo('/');
				} else {
					toast.error('Incorrect password', {
						description: 'Please try again'
					});
				}

			} else {
				toast.error('Oops', {
					description: 'Email not found'
				});
			}
		}// eslint-disable-next-line @typescript-eslint/no-explicit-any 
		catch (error:any) {
			toast.error(error.message);
		}
	}
);
</script>

<template>
  <div class="h-full flex justify-center items-center px-4">
    <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Provide email and password.</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
       <div class="gap-4 flex flex-col">
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Field
                v-slot="{ field, errorMessage }"
                name="email"
              > 
            <Input id="email" v-bind="field" :disabled="isLoading || isSubmitting" placeholder="johndoe@example.com" />
            <span v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</span>
            </Field>
          </div>
          <div class="flex flex-col space-y-1.5 relative">
            <Label for="password">Password</Label>
            <Field
                v-slot="{ field, errorMessage }"
                name="password"
              > 
            <Input id="password" v-bind="field" :type="passwordFieldType"  :disabled="isLoading || isSubmitting" placeholder="********" />
            <span v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</span>
            <Icon :name="passwordFieldType === 'text' ? 'lucide:eye-off' : 'lucide:eye'" class="w-6 h-6 absolute right-2 top-7 cursor-pointer " @click="togglePasswordType" />
            </Field>
          </div>
        </div>
        <Button type="submit" :disabled="isLoading || isSubmitting" class="w-full cursor-pointer flex items-center space-x-2">
          <Icon v-if="isSubmitting" name="line-md:loading-loop" class="w-6 h-6" />
          Sign In</Button>
       </div>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col gap-4 px-6 pb-6">
      <Button type="button" :disabled="isLoading" class="w-full flex items-center space-x-2 cursor-pointer" variant="outline" @click="initiateLoginWithGoogle">
        <Icon v-if="!isLoading" name="devicon:google" class="w-6 h-6" />
        <Icon v-else name="line-md:loading-loop" class="w-6 h-6" />
        Continue with Google
      </Button>
      <p class="text-sm text-gray-600 text-center">
  Don’t have an account?
  <NuxtLink to="/auth/signup" class="text-blue-600 hover:underline ml-1">Sign up</NuxtLink>
</p>
<p class="text-xs text-gray-400 text-center mt-2">
  Forgot your password?
  <NuxtLink to="/auth/forgot-password" class="text-blue-500 hover:underline ml-1">Reset it here</NuxtLink>
</p>
    </CardFooter>
  </Card>
  </div>
</template>