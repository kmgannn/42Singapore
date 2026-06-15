# For C files

to initialize function

```c
int main()
{
    ft_putchar('c');
    return 0;
}
```

## Function Parameters & Variables

- **Local Variables:** Function parameters (like `char *str` or `int i`) are **local variables** created specifically for that function. Just use their names directly to read or reassign them (e.g., `i = 0`). Do not write their data type again inside the function block (like `int i = 0`), as the compiler will think you are trying to declare a new variable with the same name.
- **Reassigning Pointers:** You *can* reassign a pointer parameter to a new string (e.g., `str = "hello";`). However, this overwrites the original pointer passed to the function, meaning your function will ignore the user's input and only operate on `"hello"`. Note that this only changes your local copy of the pointer; it does *not* modify the original string back in the main program.

## Loop conditions: i < n vs i < n - 1

When `n` (or `nb`) represents the maximum number of characters a function is allowed to process or a total buffer size:
- `i < n`: Runs exactly `n` times. Use this when **reading/comparing** characters, or when copying without caring about the null terminator `\0`.
- `i < n - 1`: Runs `n - 1` times. Use this when **writing** to a destination string and you **must** guarantee you have exactly 1 spot left at the very end to manually add a `\0` (e.g., `dest[i] = '\0';`) without overflowing.

## When to initialize variables to 0

- **DO NOT** initialize function parameters (the variables inside the parentheses, like `int nb` or `char *str`) to 0. Doing so permanently deletes the input value that the user passed into your function.
- **DO** initialize new local variables that you create inside the function (like `int i; i = 0;`) when you need a brand new counter or index to start from zero.