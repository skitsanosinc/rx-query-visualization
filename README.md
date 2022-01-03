# rx-query-visualization
This project demonstrates how to use regular expressions to parse data queries into blocks to be re-used in data-driven applications.

Query operations supported in this demo:

- `=` equal, 
- `~` not equal, 
- `?` like, 
- `>` greater than, 
- `<` less than

So your query string can look like this:
```
debug=true AND email?something.com
```
