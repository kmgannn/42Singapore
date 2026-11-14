#ifndef FT_PRINTF_H
# define FT_PRINTF_H

# include <stdarg.h>
# include <unistd.h>
# include <stdlib.h>

int     ft_printf(const char *format, ...);
int     ft_print_char(char c);
int     ft_print_str(char *s);
int     ft_print_nbr(long n, int base, int uppercase);
int     ft_print_unsigned(unsigned int n, unsigned int base, int uppercase);
int     ft_print_ptr(void *ptr);

#endif