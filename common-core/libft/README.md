This project has been created as part of the 42 curriculum by kgan

# Description

# Instructions

# Resources


---


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

* **`ft_strlen`**: Loop through `s` until hitting `'\0'`, keeping a count.
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

---
