const Home = () => {
    return (
        <div className="flex flex-col p-8 text-center">
            <h1>Welcome to the led matrix managing server</h1>
            <p>
                Make sure you have gone through the installation steps and have
                a led matrix set up
            </p>

            <div className="flex justify-center">
                <button className="mx-2">Show time</button>
                <button className="mx-2">Show Game of life</button>
            </div>
        </div>
    )
}

export default Home
