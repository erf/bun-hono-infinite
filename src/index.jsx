import { Hono } from 'hono'
import { faker } from '@faker-js/faker'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

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

// create a div with a random height and background color using faker
const InfiniteScrollItem = () =>
	<div class={"w-64 h-20 my-4 rounded-lg bg-slate-700"} >
		<p>hello</p>
	</div>

const Loader = ({ page }) =>
	<div
		hx-get={`/infinite-scroll/page?page=${page}`}
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

app.get('/infinite-scroll/page', infiniteScrollUsersHandler)

export default app
