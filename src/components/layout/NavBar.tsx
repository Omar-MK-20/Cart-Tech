import Link from "next/link";

function NavBar() {
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <nav className="container mx-auto p-5">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">
                                    T
                                </span>
                            </div>
                            <span className="font-bold text-xl">Cart Tech</span>
                        </Link>
                        
                    </div>

                </nav>
            </header>
        </>
    )
}

export { NavBar };