#include "ft_printf.h"
#include <stdarg.h>

int ft_printf(const char *format, ...)
{
    va_list args;
    int     counter;

    if (!format)
        return (-1);
    va_start(args, format);
    counter = 0;
    while (*format)
    {
        if (*format == '%')
        {
            format++; // Move past '%'
            if (*format == 'c')
                counter += ft_print_char(va_arg(args, int));
            else if (*format == 's')
                counter += ft_print_str(va_arg(args, char *));
            else if (*format == 'p')
                counter += ft_print_ptr(va_arg(args, void *));
            else if (*format == 'd' || *format == 'i')
                counter += ft_print_nbr((long)va_arg(args, int), 10, 0);
            else if (*format == 'u')
                counter += ft_print_unsigned(va_arg(args, unsigned int), 10, 0);
            else if (*format == 'x')
                counter += ft_print_unsigned(va_arg(args, unsigned int), 16, 0);
            else if (*format == 'X')
                counter += ft_print_unsigned(va_arg(args, unsigned int), 16, 1);
            else if (*format == '%')
                counter += ft_print_char('%');
        }
        else
        {
            counter += ft_print_char(*format); // Or ft_print_char(*format)
        }
        format++;
    }
    va_end(args);
    return (counter);
}