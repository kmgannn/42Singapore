Edited ft_putstr.c
Viewed ft_putstr.c:1-13

Here is a breakdown of how `write` works and why the ampersand `&` is the difference between printing and crashing.

The `write` function always expects three arguments: `write(where_to_print, memory_address, how_many_bytes)`.

1. **Arg 1 (`1`)**: This is the "file descriptor". `1` simply means "Standard Output" (your terminal screen).
2. **Arg 2 (`&str[i]`)**: This must be a **pointer** (a memory address) telling `write` exactly *where* to find the data in RAM. It does not accept the data itself.
3. **Arg 3 (`1`)**: How many bytes (characters) to print starting from that memory address.

### Why passing `str[i]` causes a crash

In C, a character is actually just a number behind the scenes (its ASCII code). For example, the letter `'H'` is actually the number `72`.

If you write `write(1, str[i], 1)` and `str[i]` is `'H'`, you are effectively doing this:
`write(1, 72, 1);`

Because `write` strictly expects a memory address for its second argument, it interprets the `72` not as the letter 'H', but as **Memory Address 72**. 

It then tries to go to memory address 72 to read a character. However, low memory addresses (like 72) are strictly reserved for the operating system's core functions. When your program tries to sneak in and read from restricted system memory, the operating system instantly catches it and forcefully kills your program for safety. 

This specific crash is what is known as a **Segmentation Fault** (or "segfault"). 

### Why `&` fixes it

The ampersand `&` is the "address-of" operator. 

When you do `&str[i]`, you are telling the computer: *"Don't give `write` the letter 'H'. Instead, give `write` the specific memory address where you are currently storing the letter 'H'."*

So instead of passing `72`, it passes a valid, safe address like `0x7ffebec04820`. The `write` function safely goes to that address, finds the `'H'` sitting there, and prints it to your screen!