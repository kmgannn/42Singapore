# variables
NAME = libftprintf.a

CC = cc
CFLAGS = -Wall -Wextra -Werror
RM = rm -f
AR = ar rcs

SRC = ft_printf.c ft_print_char.c ft_print_str.c ft_print_nbr.c ft_print_unsigned.c ft_print_ptr.c

# object files (compiled intermediate machine-code)
OBJ = $(SRC:.c=.o)

# 1. default target
all: $(NAME)

# 2. linking rules
$(NAME): $(OBJ)
	$(AR) $(NAME) $(OBJ)

# 3. rule to compile .c into .o files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# 4. utility rules
clean:
	$(RM) $(OBJ)

fclean: clean
	$(RM) $(NAME)

re: fclean all

.PHONY: all clean fclean re bonus