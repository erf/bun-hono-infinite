import { Hono } from 'hono'
import { faker } from '@faker-js/faker'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

const InfiniteScrollItem = () =>
	<a href="#" class="block">
		<img
			alt="Art"
			src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
			class="h-64 w-64 object-cover sm:h-80 lg:h-96"
		/>
		<h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">{faker.lorem.lines(1)}</h3>
		<p class="mt-2 max-w-sm text-gray-700"> {faker.lorem.paragraph()} </p>
	</a>

const Layout = ({ children }) =>
	<html>
		<head>
			<title>Hono</title>
			<script src="https://unpkg.com/htmx.org@1.9.9"></script>
			<script src="https://cdn.tailwindcss.com"></script>
		</head>
		<body>
			<div class={"container mx-auto"}>
				{children}
			</div>
		</body>
	</html>

const Loader = ({ page }) =>
	<div
		hx-get={`/infinite-scroll/users?page=${page}`}
		hx-trigger={"revealed"}
		hx-target={"this"}
		hx-swap={"outerHTML"}
	>
		<span>Loading page {page}</span>
	</div>

const infiniteScrollHandler = (c) => c.html(
	<Layout >
		<InfiniteScrollItem />
		<InfiniteScrollItem />
		<InfiniteScrollItem />
		<Loader page={1} />
	</Layout>
)

const infiniteScrollUsersHandler = (c) => {
	const page = c.req.query('page')
	const nextPage = parseInt(page) + 1
	console.log(page)
	return c.html(
		<>
			<InfiniteScrollItem />
			<InfiniteScrollItem />
			<Loader page={nextPage} />
		</>
	)
}

app.get('/infinite-scroll', infiniteScrollHandler)

app.get('/infinite-scroll/users', infiniteScrollUsersHandler)

export default app
