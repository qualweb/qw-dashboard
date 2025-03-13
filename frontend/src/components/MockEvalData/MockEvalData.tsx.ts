import { EvaluationData, TestEvaluationData } from '../Types/Types.tsx';

export const mockEvaluationData: EvaluationData = {
  "https://example.com": {
    passed: {
      tests: [
        {
          id: 1,
          description: "All images have alt text",
          rule: "ACT-R23",
          results: [
            {
              id: 101,
              description: "Hero image",
              code: "<img src='hero.jpg' alt='Company headquarters'>",
              location: "html > body > header > div:nth-child(1) > div > img:nth-child(1)"
            },
            {
              id: 102,
              description: "Product thumbnail",
              code: "<img src='product1.jpg' alt='Premium headphones'>",
              location: "html > body > main > section:nth-child(2) > div:nth-child(1) > div:nth-child(3) > img"
            }
          ]
        },
        {
          id: 2,
          description: "Sufficient color contrast",
          rule: "ACT-R37",
          results: [
            {
              id: 201,
              description: "Header text",
              code: "<h1 style='color: #333; background-color: #fff;'>Welcome</h1>",
              location: "html > body > header > div:nth-child(2) > h1"
            }
          ]
        }
      ]
    },
    warnings: {
      tests: [
        {
          id: 3,
          description: "Form labels may be unclear",
          rule: "ACT-R14",
          results: [
            {
              id: 301,
              description: "Contact form",
              code: "<label for='message'>M:</label>",
              location: "html > body > main > section:nth-child(4) > div:nth-child(2) > div:nth-child(1) > form > div:nth-child(3) > label"
            }
          ]
        }
      ]
    },
    failed: {
      tests: [
        {
          id: 4,
          description: "Missing ARIA attributes on interactive elements",
          rule: "ACT-R16",
          results: [
            {
              id: 401,
              description: "Navigation menu",
              code: "<div class='menu'>Menu items</div>",
              location: "html > body > header > nav > div:nth-child(2) > div:nth-child(1)"
            },
            {
              id: 402,
              description: "Accordion",
              code: "<div class='accordion'>FAQ items</div>",
              location: "html > body > main > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)"
            }
          ]
        }
      ]
    },
    inapplicable: {
      tests: [
        {
          id: 5,
          description: "Video captions",
          rule: "ACT-R5",
          results: [
            {
              id: 501,
              description: "No videos found",
              code: "",
              location: "html > body"
            }
          ]
        }
      ]
    }
  },
  "https://blog.example.com": {
    passed: {
      tests: [
        {
          id: 6,
          description: "Heading structure",
          rule: "ACT-R43",
          results: [
            {
              id: 601,
              description: "Blog post heading structure",
              code: "<h1>Blog Title</h1><h2>Section 1</h2>",
              location: "html > body > div:nth-child(1) > main > article > div:nth-child(1) > h1"
            }
          ]
        }
      ]
    },
    warnings: {
      tests: [
        {
          id: 7,
          description: "Link text might not be descriptive enough",
          rule: "ACT-R20",
          results: [
            {
              id: 701,
              description: "Read more link",
              code: "<a href='post1.html'>Read more</a>",
              location: "html > body > div:nth-child(1) > main > div:nth-child(3) > div:nth-child(2) > article:nth-child(1) > div:nth-child(3) > a"
            },
            {
              id: 702,
              description: "Click here link",
              code: "<a href='download.html'>Click here</a>",
              location: "html > body > div:nth-child(1) > main > aside > div:nth-child(2) > div:nth-child(3) > a:nth-child(1)"
            }
          ]
        }
      ]
    },
    failed: {
      tests: [
        {
          id: 8,
          description: "Tables missing headers",
          rule: "ACT-R51",
          results: [
            {
              id: 801,
              description: "Statistics table",
              code: "<table><tr><td>2023</td><td>5000</td></tr></table>",
              location: "html > body > div:nth-child(1) > main > article > div:nth-child(5) > table"
            }
          ]
        }
      ]
    },
    inapplicable: {
      tests: [
        {
          id: 9,
          description: "Form validation",
          rule: "ACT-R65",
          results: [
            {
              id: 901,
              description: "No forms found",
              code: "",
              location: "html > body"
            }
          ]
        }
      ]
    }
  },
  "https://shop.example.com": {
    passed: {
      tests: [
        {
          id: 10,
          description: "Keyboard navigation",
          rule: "ACT-R2",
          results: [
            {
              id: 1001,
              description: "Product cards tab order",
              code: "<div tabindex='0' class='product-card'>Product 1</div>",
              location: "html > body > main > div:nth-child(2) > div:nth-child(3) > div:nth-child(1)"
            }
          ]
        }
      ]
    },
    warnings: {
      tests: [
        {
          id: 11,
          description: "Form field validation might be insufficient",
          rule: "ACT-R75",
          results: [
            {
              id: 1101,
              description: "Email field validation",
              code: "<input type='email' name='email'>",
              location: "html > body > main > div:nth-child(3) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > input"
            }
          ]
        }
      ]
    },
    failed: {
      tests: [
        {
          id: 12,
          description: "Form input missing label",
          rule: "ACT-R14",
          results: [
            {
              id: 1201,
              description: "Search input",
              code: "<input type='text' placeholder='Search'>",
              location: "html > body:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > label:nth-child(1) > input:nth-child(1)"
            }
          ]
        }
      ]
    },
    inapplicable: {
      tests: [
        {
          id: 13,
          description: "Audio transcripts",
          rule: "ACT-R33",
          results: [
            {
              id: 1301,
              description: "No audio elements found",
              code: "",
              location: "html > body"
            }
          ]
        }
      ]
    }
  }
};

export const mockTestsEvaluationData: TestEvaluationData = {
  passed: {
    1: {
      id: 1,
      description: "All images have alt text",
      rule: "ACT-R23",
      results: [
        {
          id: 101,
          description: "Hero image",
          code: "<img src='hero.jpg' alt='Company headquarters'>",
          location: "html > body > header > div:nth-child(1) > div > img:nth-child(1)",
          url: "https://example.com"
        },
        {
          id: 102,
          description: "Product thumbnail",
          code: "<img src='product1.jpg' alt='Premium headphones'>",
          location: "html > body > main > section:nth-child(2) > div:nth-child(1) > div:nth-child(3) > img",
          url: "https://example.com"
        }
      ]
    },
    2: {
      id: 2,
      description: "Sufficient color contrast",
      rule: "ACT-R37",
      results: [
        {
          id: 201,
          description: "Header text",
          code: "<h1 style='color: #333; background-color: #fff;'>Welcome</h1>",
          location: "html > body > header > div:nth-child(2) > h1",
          url: "https://example.com"
        }
      ]
    },
    6: {
      id: 6,
      description: "Heading structure",
      rule: "ACT-R43",
      results: [
        {
          id: 601,
          description: "Blog post heading structure",
          code: "<h1>Blog Title</h1><h2>Section 1</h2>",
          location: "html > body > div:nth-child(1) > main > article > div:nth-child(1) > h1",
          url: "https://blog.example.com"
        }
      ]
    },
    10: {
      id: 10,
      description: "Keyboard navigation",
      rule: "ACT-R2",
      results: [
        {
          id: 1001,
          description: "Product cards tab order",
          code: "<div tabindex='0' class='product-card'>Product 1</div>",
          location: "html > body > main > div:nth-child(2) > div:nth-child(3) > div:nth-child(1)",
          url: "https://shop.example.com"
        }
      ]
    }
  },
  warnings: {
    3: {
      id: 3,
      description: "Form labels may be unclear",
      rule: "ACT-R14",
      results: [
        {
          id: 301,
          description: "Contact form",
          code: "<label for='message'>M:</label>",
          location: "html > body > main > section:nth-child(4) > div:nth-child(2) > div:nth-child(1) > form > div:nth-child(3) > label",
          url: "https://example.com"
        }
      ]
    },
    7: {
      id: 7,
      description: "Link text might not be descriptive enough",
      rule: "ACT-R20",
      results: [
        {
          id: 701,
          description: "Read more link",
          code: "<a href='post1.html'>Read more</a>",
          location: "html > body > div:nth-child(1) > main > div:nth-child(3) > div:nth-child(2) > article:nth-child(1) > div:nth-child(3) > a",
          url: "https://blog.example.com"
        },
        {
          id: 702,
          description: "Click here link",
          code: "<a href='download.html'>Click here</a>",
          location: "html > body > div:nth-child(1) > main > aside > div:nth-child(2) > div:nth-child(3) > a:nth-child(1)",
          url: "https://blog.example.com"
        }
      ]
    },
    11: {
      id: 11,
      description: "Form field validation might be insufficient",
      rule: "ACT-R75",
      results: [
        {
          id: 1101,
          description: "Email field validation",
          code: "<input type='email' name='email'>",
          location: "html > body > main > div:nth-child(3) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > input",
          url: "https://shop.example.com"
        }
      ]
    }
  },
  failed: {
    4: {
      id: 4,
      description: "Missing ARIA attributes on interactive elements",
      rule: "ACT-R16",
      results: [
        {
          id: 401,
          description: "Navigation menu",
          code: "<div class='menu'>Menu items</div>",
          location: "html > body > header > nav > div:nth-child(2) > div:nth-child(1)",
          url: "https://example.com"
        },
        {
          id: 402,
          description: "Accordion",
          code: "<div class='accordion'>FAQ items</div>",
          location: "html > body > main > section:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)",
          url: "https://example.com"
        }
      ]
    },
    8: {
      id: 8,
      description: "Tables missing headers",
      rule: "ACT-R51",
      results: [
        {
          id: 801,
          description: "Statistics table",
          code: "<table><tr><td>2023</td><td>5000</td></tr></table>",
          location: "html > body > div:nth-child(1) > main > article > div:nth-child(5) > table",
          url: "https://blog.example.com"
        }
      ]
    },
    12: {
      id: 12,
      description: "Form input missing label",
      rule: "ACT-R14",
      results: [
        {
          id: 1201,
          description: "Search input",
          code: "<input type='text' placeholder='Search'>",
          location: "html > body:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > label:nth-child(1) > input:nth-child(1)",
          url: "https://shop.example.com"
        }
      ]
    }
  },
  inapplicable: {
    5: {
      id: 5,
      description: "Video captions",
      rule: "ACT-R5",
      results: [
        {
          id: 501,
          description: "No videos found",
          code: "",
          location: "html > body",
          url: "https://example.com"
        }
      ]
    },
    9: {
      id: 9,
      description: "Form validation",
      rule: "ACT-R65",
      results: [
        {
          id: 901,
          description: "No forms found",
          code: "",
          location: "html > body",
          url: "https://blog.example.com"
        }
      ]
    },
    13: {
      id: 13,
      description: "Audio transcripts",
      rule: "ACT-R33",
      results: [
        {
          id: 1301,
          description: "No audio elements found",
          code: "",
          location: "html > body",
          url: "https://shop.example.com"
        }
      ]
    }
  }
};