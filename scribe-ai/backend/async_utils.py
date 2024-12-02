import asyncio
from concurrent.futures import ThreadPoolExecutor

async def run_async_firebase_op(func, *args, **kwargs):
    """
    Run synchronous Firebase operations in an async context.

    Args:
        func: The synchronous function to be executed
        *args: Positional arguments for the function
        **kwargs: Keyword arguments for the function

    Returns:
        Result of the function execution
    """
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as pool:
        return await loop.run_in_executor(pool, lambda: func(*args, **kwargs))