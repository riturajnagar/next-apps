import ReactMarkdown from 'react-markdown'
import { getAllPublished, getSinglePost } from "./notion"

const Post = ({ post }) => {
    return (
        <section className='container my-3'>
            <h2 className='text-center'>{post.metadata.title}</h2>
            <span>{post.metadata.date}</span>
            <div className="container my-3 border shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <p className='text-center word-wrap'>{post.metadata.description}</p>
            </div>

            <ReactMarkdown>{post.description}</ReactMarkdown>
        </section>
    );
};
/*
Similarly to the blog overview page, you will be pre-rendering each post page.
 
In /pages/posts/[slug].js, add the getStaticProps() function after the Post component and call the getSingleBlogPostBySlug function to fetch the blog post from Notion.
*/

export const getStaticProps = async ({ params }) => {
    const post = await getSinglePost(params.slug)

    return {
        props: {
            post,
        },
        revalidate: 60
    };
};

export const getStaticPaths = async () => {
    const posts = await getAllPublished();
    const paths = posts.map(({ slug }) => ({ params: { slug } }));

    return {
        paths,
        fallback: "blocking",
    };
};

export default Post;