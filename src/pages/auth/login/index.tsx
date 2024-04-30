import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { IconLottie } from "@/components/ui/icons";
import signInAnimation from "@/assets/lottie/sign-in.json";
import { InputField } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { 
	Card, 
	CardContent, 
	CardDescription, 
	CardFooter, 
	CardHeader, 
	CardTitle 
} from "@/components/ui/card";

const loginSchema = z.object({
	username: z.string().min(1, "Mohon mengisi Username"),
	password: z.string().min(1, "Mohon mengisi Password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const defaultValues: LoginSchema = {
	username: "",
	password: ""
}

const LoginPage: React.FC = () => {
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues
	});
	
	const handleOnSubmit = form.handleSubmit((values) => {
		console.log(values);
	})
	
	return (
		<Form form={form} onSubmit={handleOnSubmit}>
			<div className="flex flex-grow h-screen">
				<div className="h-full hidden md:flex w-1/2 items-center justify-center  bg-primary-300">
					<IconLottie animationData={signInAnimation} className="w-1/2"/>
				</div>
				<div className="w-full flex items-center justify-center md:w-1/2">
					<Card>
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>Silahkan masuk menggunakan akun anda.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<InputField name="username" label="Username" />
							<InputField name="password" type="password" label="Password" />
						</CardContent>
						<CardFooter>
							<Button 
								type="submit" 
								size="sm" 
								isLoading={false} 
								variant="default"
								className="w-full"
							>
								Masuk
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</Form>
	)
}

export default LoginPage
