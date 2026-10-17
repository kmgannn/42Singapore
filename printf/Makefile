# variables
NAME = libftprintf.a

CC = cc
CFLAGS = -Wall -Wextra -Werror
RM = rm -f
AR = ar rcs

SRC = 

# object files (compiled intermediate machine-code)
OBJ = $(SRC:.c=.o)

# 1. default target
all: $(NAME)

# 2. linking rules
$(NAME): $(OBJ)
	$(AR) $(NAME) $(OBJ)

# 3. rule to compile .c into .o files
%.o: %.cc
	$(CC) $(CFLAGS) -c $< -o $@

# 4. utility rules
clean:
	$(RM) $(OBJ)

fclean: clean
	$(RM) $(NAME)

re: fclean all

.PHONY: all clean fclean re bonus