*This project has been created as part of the 42 curriculum by kgan*

# Description

**Libft** is the very first project at 42, with the goal of coding a custom C library from scratch. It serves as a foundational toolkit containing numerous general-purpose functions that will be reused throughout the rest of the curriculum.

The project is split into three mandatory parts:

* **Part 1 (Libc Functions):** Reimplementing standard C library functions (memory manipulation, string searching, character checks) with an `ft_` prefix.


* **Part 2 (Additional Functions):** Developing custom utility functions for string manipulation, memory allocation, and file descriptor output (`ft_substr`, `ft_strjoin`, `ft_split`, `ft_itoa`, etc.).


* **Part 3 (Linked List Functions):** Implementing data structures and functions for handling single linked lists (`t_list`).

Makefile: compilation automation script to automate dependencies, instead of compiling every individual file. `ar` command is an archiver because functions like libtool are forbidden. Hence the command ar rcs libft.a $(OBJS) tells the archiver to:
- Replace object files into the archive, 
- Create it if it doesn't exist 
- write a Symbol table in it so the compiler can quickly look up where each function lives.

## 1. Character Testing & Case Conversion

These functions evaluate or transform a single character passed as an `int` (to handle `EOF` and `unsigned char` range).

* **`ft_isalpha`**: Check if `c` falls within `'a'` through `'z'` or `'A'` through `'Z'`.
* **`ft_isdigit`**: Check if `c` falls within `'0'` through `'9'`.
* **`ft_isalnum`**: Return 1 if either `ft_isalpha(c)` or `ft_isdigit(c)` returns 1.
* **`ft_isascii`**: Check if `c` is within the valid ASCII range (`0` to `127`).
* **`ft_isprint`**: Check if `c` is a printable ASCII character (`32` to `126`, inclusive).
* **`ft_toupper`**: If `c` is lowercase (`'a'` to `'z'`), return `c - 32`; otherwise return `c`.
* **`ft_tolower`**: If `c` is uppercase (`'A'` to `'Z'`), return `c + 32`; otherwise return `c`.

---

## 2. String Examination & Navigation

These functions traverse null-terminated character strings.

* **`ft_strlen`**: Returns the length of a string, reflects the number of characters until hitting `'\0'`.
* **`ft_strchr`**: Iterate through `s` looking for the first instance of `c` (cast to `char`). **Key detail:** If `c == '\0'`, return a pointer to the string's null terminator.
* **`ft_strrchr`**: Search for `c` starting from the end of `s` (or scan to the end and track the last seen occurrence).
* **`ft_strncmp`**: Compare up to `n` characters of `s1` and `s2` using `unsigned char` cast comparisons. Stop early if characters differ or `'\0'` is reached.
* **`ft_strnstr`**: Find the first occurrence of substring `little` inside `big`, searching at most `len` characters. If `little` is empty, return `big`.

---

## 3. Byte Memory Operations

Because these operate on raw byte memory buffers (not necessarily null-terminated), parameters are typed as `void *` and iterated as `unsigned char *`.

* **`ft_memset`**: Fill `n` bytes of memory area `b` with constant byte `c`.
* **`ft_bzero`**: Fill `n` bytes of memory area `s` with zeros (or just call `ft_memset(s, 0, n)`).
* **`ft_memcpy`**: Copy `n` bytes from source memory `src` to destination memory `dest`. (Assume non-overlapping memory).
* **`ft_memmove`**: Copy `n` bytes from `src` to `dest`. **Key detail:** Must handle overlapping buffers safely. If `dest > src`, copy backwards from `n - 1` down to `0`; otherwise, copy forwards.
* **`ft_memchr`**: Scan `n` bytes of memory `s` for byte `c`. Return a pointer to the matching byte or `NULL`.
* **`ft_memcmp`**: Compare `n` bytes of memory areas `s1` and `s2` using `unsigned char` casts.

---

## 4. Size-Bounded String Copying & Concatenation

These functions prevent buffer overflow issues when working with strings.

* **`ft_strlcpy`**: Copy up to `dstsize - 1` characters from `src` to `dst`, ensuring `dst` is null-terminated (if `dstsize > 0`). Return value is always the total length of `src` attempted to be copied.
* **`ft_strlcat`**: Append `src` onto `dst`, writing at most `dstsize - strlen(dst) - 1` bytes and ensuring `dst` ends with `'\0'`. Return value is `strlen(src)` plus initial length of `dst` (or `dstsize` if `dst` had no null terminator within `dstsize`).

---

## 5. Conversion & Allocations

* **`ft_atoi`**: Skip leading whitespace characters (`' '`, `'\t'`, `'\n'`, etc.), parse an optional sign (`+` or `-`), and convert contiguous trailing numeric characters into an `int`.
* **`ft_calloc`**: Allocate memory for `nmemb * size` bytes using `malloc`, zero out all bytes (using `ft_bzero` or `ft_memset`), and return the pointer. Handles zero-byte allocations correctly.
* **`ft_strdup`**: Measure string length using `ft_strlen`, allocate `len + 1` bytes with `malloc`, copy contents using `ft_memcpy` or `ft_strlcpy`, and return the new dynamically allocated string.

## 6. Linked List Functions (Part 3)

These functions handle the manipulation of single linked lists using the `t_list` structure (`content`, `next`).

- **`ft_lstnew`**: Allocate and return a new node with `content` initialized, setting `next` to `NULL`.
- **`ft_lstadd_front`**: Add a new node at the beginning of the list.
- **`ft_lstsize`**: Count the number of nodes in a list.
- **`ft_lstlast`**: Return the last node of the list.
- **`ft_lstadd_back`**: Add a new node at the end of the list.
- **`ft_lstdelone`**: Free a node's content using a custom function pointer and free the node itself.
- **`ft_lstclear`**: Free and delete all subsequent nodes starting from the given one.
- **`ft_lstiter`**: Iterate through the list and apply a function to each node's content.
- **`ft_lstmap`**: Iterate through the list, applying a function to create a fresh list resulting from successive applications.


# Instructions

## **Compilation**

To compile the library and generate the static archive `libft.a`, run the `Makefile` located at the root of your repository:

* `make` or `make all`: Compiles all mandatory object files and archives them into `libft.a`.


* `make clean`: Removes all compiled object (`.o`) files.
* `make fclean`: Removes all object files as well as the generated `libft.a` library file.
* `make re`: Performs a complete clean rebuild (`fclean` followed by `all`).

## **Usage**

To use the library in your own C projects:

1. Include the header file in your source code:
```c
#include "libft.h"

```


2. Compile your program and link the static library:
```bash
gcc -Wall -Wextra -Werror main.c libft.a

```

# Resources

* **Documentation & Manuals:** Standard Unix `man` pages for libc function prototypes and behaviors.
* w3schools, FreeBSD when `man` pages weren't available, or reading how each parameters are being used.

* **AI Usage Disclosure:**
* AI tools were used during this project as an interactive planning and debugging partner to help structure a 7-day milestone timeline, review pointer arithmetic edge cases (such as backward memory copying in `ft_memmove`), and design safe memory-cleanup logic for complex parsing functions like `ft_split`. It is also used as a teaching tool to explain and give analogies when the manual didn't make sense, or to explain if my understanding of the manual is right.
