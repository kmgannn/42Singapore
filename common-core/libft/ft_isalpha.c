isalpha
checks  for an alphabetic character; in the standard "C" locale, it is equivalent to
(isupper(c) || islower(c)).  In some locales, there may be additional characters for
which isalpha() is true—letters which are neither uppercase nor lowercase.
a to z 
97 - 122

A to Z
65 - 90

int ft_isalpha(char c)
{
    int i = 0;
    if ( i < 65 )
}


isdigit
checks for a digit (0 through 9).
0 to 9
48 - 57

            
isalnum
checks  for an alphabetic character; in the standard "C" locale, it is equivalent to
(isupper(c) || islower(c)).  In some locales, there may be additional characters for
which isalpha() is true—letters which are neither uppercase nor lowercase.


isascii
checks  for an alphabetic character; in the standard "C" locale, it is equivalent to
(isupper(c) || islower(c)).  In some locales, there may be additional characters for
which isalpha() is true—letters which are neither uppercase nor lowercase.


isprint
checks for any printable character including space.
space 32