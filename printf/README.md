*This project has been created as part of the 42 curriculum by kgan*

# Description

Recoding the printf() function from libc

- buffer management not required
```
• %c Prints a single character.
• %s Prints a string (as defined by the common C convention).
• %p The void * pointer argument has to be printed in hexadecimal format.
• %d Prints a decimal (base 10) number.
• %i Prints an integer in base 10.
• %u Prints an unsigned decimal (base 10) number.
• %x Prints a number in hexadecimal (base 16) lowercase format.
• %X Prints a number in hexadecimal (base 16) uppercase format.
• %% Prints a percent sign.
```
- `ar` groups multiple compiled object files into a single static library ending in .a
```
ar rcs libftprintf.a file1.o file2.o
```
`r` replaces or add files to the archive
`c` creates the library if it does not exist
`s` s: Write an index (symbol table) into the archive to speed up linking

The process of .c files (cc -c) -> .o files (ar rcs) -> libftprintf.a happens within the makefile by comparing the timestamp of the soucefile with the compiled file
```
ft_printf.o: ft_printf.c
	cc -Wall -Wextra -Werror -c ft_printf.c -o ft_printf.o

libftprintf.a: ft_printf.o
	ar rcs libftprintf.a ft_printf.o
```

##  **Variadic Functions**

Printf takes in a variable number of parameters:
```
#include <stdarg.h> /* Defines va… macros. */
…

int add_multiple_values (int argcount, ...)
{
  int counter, total = 0;

  /* Declare a variable of type va_list. */
  va_list argptr;

  /* Initialize that variable.. */
  va_start (argptr, argcount);

  for (counter = 0; counter < argcount; counter++)
    {
      /* Get the next additional argument. */
      total += va_arg (argptr, int);
    }

  /* End use of the argptr variable. */
  va_end (argptr);

  return total;
}
```

- conversions of `c` `s` `p` `d` `i` `u` `x` `X` `%`

- allowed functions `malloc` `free` `write` `va_start` `va_arg` `va_copy` `va_end` 



Function that takes a variable nubmer of arguments.
- must specify at least one fixed argument with an explicitly declared data type


# Instructions

## **Compilation**



# Resources

* **Documentation & Manuals:** Standard Unix `man` pages for libc function prototypes and behaviors.
* w3schools, FreeBSD when `man` pages weren't available, or reading how each parameters are being used.

* **AI Usage Disclosure:**
* AI tools were used during this project as an interactive planning and debugging partner to help structure a 7-day milestone timeline, review pointer arithmetic edge cases (such as backward memory copying in `ft_memmove`), and design safe memory-cleanup logic for complex parsing functions like `ft_split`. It is also used as a teaching tool to explain and give analogies when the manual didn't make sense, or to explain if my understanding of the manual is right.
