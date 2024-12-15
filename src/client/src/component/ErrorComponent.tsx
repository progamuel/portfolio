export const ErrorComponent = ({ social }: { social?: { title: string, link: string } }) => {
    return (
        <div className="Error">
            {(social?.title && social?.link) ? <p>Oops! Looks like something went wrong. But you can still reach me on <a href={social.link}>{social.title}</a></p> : <p>Oops! Looks like something went wrong.</p>}
        </div >
    );
};