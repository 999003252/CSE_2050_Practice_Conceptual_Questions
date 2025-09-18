import React, {useState, useEffect} from "react";

// CSE-2050 Practice Quiz App — improved
// - Each module now has a question *bank* (~25 questions)
// - Each attempt selects a randomized quiz of 10 unique questions from the bank
// - Questions include code-output multiple-choice items
// - "Try Again" regenerates a new randomized quiz for that module
// Tailwind classes used for styling. Default-export a single React component.

export default function QuizApp(){
  // Full question banks (approx 25 questions per module). Keep questions concise.
  const fullBanks = {
    "Module 1 - Python Fundamentals": [
      {id: 'm1q1', q: `What is the output of:\n\ta = [1,2,3,4]\n\tprint(a[3:1:-1])`, choices: ['[]','[4,3]','[4,1]','[3,4]'], ans: 1},
      {id: 'm1q2', q: 'Which of these is a valid variable name in Python?', choices: ['123abc','abc-123','abc_123','*abc123'], ans: 2},
      {id: 'm1q3', q: 'What type does `(str(min(L)), str(max(L)))` produce?', choices: ['list','tuple','str','NoneType'], ans: 1},
      {id: 'm1q4', q: `What prints?\nfor i in range(5):\n  if i == 3: break\n  print(i, end=', ')`, choices: ['0, 1, 2, ','0, 1, 2, 3, ','3, ','0, 1, 2, 3, 4, '], ans: 0},
      {id: 'm1q5', q: 'Which is true: lists vs tuples?', choices: ['Tuples are mutable','Tuples and lists unordered','Lists mutable, tuples immutable','Tuples use {}'], ans: 2},
      {id: 'm1q6', q: 'What does `if __name__ == "__main__":` do?', choices: ['Run only when imported','Run only when executed directly','Check Python version','Make module a package'], ans: 1},
      {id: 'm1q7', q: `What prints?\nx=['a','b','c']\ny=x\ny.append('d')\nprint(x,y)`, choices: ["['a','b','c'] ['a','b','c','d']","['a','b','c','d'] ['a','b','c','d']","['a','b','c'] ['d','a','b','c']","Error"], ans: 1},
      {id: 'm1q8', q: 'Which import puts pi into namespace?', choices: ['import math.pi','import math as m','from math import pi','import * math'], ans: 2},
      {id: 'm1q9', q: 'What is `a[::2]` for `a=[1,2,3,4]`?', choices: ['[2]','[1,3]','[2,4]','[]'], ans: 1},
      {id: 'm1q10', q: 'Which built-in is sequential (single best)?', choices: ['set','dict','list','None'], ans: 2},
      {id: 'm1q11', q: 'What does `len("hello")` return?', choices: ['4','5','6','Error'], ans: 1},
      {id: 'm1q12', q: `What is printed?\nprint(2 + 3 * 4 // 2**3)`, choices: ['1','2','3','3.5'], ans: 2},
      {id: 'm1q13', q: 'Which is correct to import function f from module m?', choices: ['import m.f','from m import f','import m as f','require m.f'], ans: 1},
      {id: 'm1q14', q: 'What does `a[3:1:-1]` return for a=[1,2,3,4]?', choices: ['[4,3]','[4,1]','[]','[3,4]'], ans: 0},
      {id: 'm1q15', q: 'Which is immutable?', choices: ['list','dict','tuple','set'], ans: 2},
      {id: 'm1q16', q: 'What is the output: `"a" * 3`?', choices: ['"aaa"','"a3"','"aaa" as list','Error'], ans: 0},
      {id: 'm1q17', q: 'Which method returns index of an item in list?', choices: ['find','index','locate','search'], ans: 1},
      {id: 'm1q18', q: 'What is result of `3//2` in Python?', choices: ['1','1.5','2','0'], ans: 0},
      {id: 'm1q19', q: 'Which converts string s to int?', choices: ['int(s)','str(s)','float(s)','toInt(s)'], ans: 0},
      {id: 'm1q20', q: 'Which opens file for appending?', choices: ['r','w','a','x'], ans: 2},
      {id: 'm1q21', q: 'What does `enumerate(["a","b"])` produce when iterated?', choices: ['("a",0),("b",1)','(0,"a"),(1,"b")','("a"),("b")','Error'], ans: 1},
      {id: 'm1q22', q: 'What is the type of `None`?', choices: ['0','False','NoneType','null'], ans: 2},
      {id: 'm1q23', q: 'Which built-in creates a list from iterable?', choices: ['list()','set()','tuple()','dict()'], ans: 0},
      {id: 'm1q24', q: 'Which raises exception when key not in dict using []?', choices: ['get()','__contains__','__getitem__','pop()'], ans: 2},
      {id: 'm1q25', q: 'What is `"\n"`?', choices: ['space','newline','tab','backslash-n'], ans: 1}
    ],

    "Module 2 - Object-Oriented Programming": [
      {id: 'm2q1', q: 'What is `self` inside a class method?', choices: ['Creates object','Reference to instance','Global var','Decorator'], ans: 1},
      {id: 'm2q2', q: `Given:\nclass A: def __init__(self): self.x=1\nclass B(A): def __init__(self): self.y=2\nprint(B().x)\nWhat happens?`, choices: ['prints 1','prints 2','prints 1 2','AttributeError'], ans: 3},
      {id: 'm2q3', q: 'How to ensure parent __init__ runs in subclass?', choices: ['A.__init__(self)','super().__init__()','self.parent()','No need'], ans: 1},
      {id: 'm2q4', q: 'What does `__str__` control?', choices: ['Instance creation','Private attr','Printable string','Memory layout'], ans: 2},
      {id: 'm2q5', q: 'Which shows composition?', choices: ['class B(A): ...','def foo(self): super()','class C: def __init__(self): self.d = D()','Overriding methods'], ans: 2},
      {id: 'm2q6', q: 'Single underscore `_x` means?', choices: ['Enforced private','Convention: internal','Dunder','Immutable'], ans: 1},
      {id: 'm2q7', q: 'Duck typing means?', choices: ['Check type first','Use object with required methods','Garbage collector','Threading model'], ans: 1},
      {id: 'm2q8', q: 'Class vs instance var: which is shared?', choices: ['Instance vars shared','Class vars shared','Class vars in __init__','Instance vars immutable'], ans: 1},
      {id: 'm2q9', q: 'What does MRO affect?', choices: ['Syntax','Which parent method chosen','Garbage collection','I/O'], ans: 1},
      {id: 'm2q10', q: 'Correct parent constructor call?', choices: ['super.__init__()','super().__init__(self)','super().__init__()','A.__init__()'], ans: 2},
      {id: 'm2q11', q: `What prints?\nclass S:\n  def __str__(self): return 'hi'\nprint(S())`, choices: ['<obj>','hi','Error','None'], ans: 1},
      {id: 'm2q12', q: 'Which is true of __repr__ vs __str__?', choices: ['__repr__ for dev, __str__ for users','__str__ for dev','They are identical always','Neither used by print()'], ans: 0},
      {id: 'm2q13', q: 'How to make attribute read-only?', choices: ['Use public var','Name mangling','Property with getter only','Use tuple'], ans: 2},
      {id: 'm2q14', q: 'What is name mangling for __x?', choices: ['No effect','_ClassName__x','__x__','_x'], ans: 1},
      {id: 'm2q15', q: 'Which is polymorphism example?', choices: ['Overloading in Python','Different classes implement same method','Static typing','malloc/free'], ans: 1},
      {id: 'm2q16', q: 'What is composition advantage?', choices: ['Simpler tests','Reuse behavior without inheritance','Faster code','Less memory'], ans: 1},
      {id: 'm2q17', q: `Code output:\nclass A:\n  pass\nprint(isinstance(A(), A))`, choices: ['False','True','Error','None'], ans: 1},
      {id: 'm2q18', q: 'What's output: `type( (1,) )`?', choices: ['list','tuple','int','dict'], ans: 1},
      {id: 'm2q19', q: 'Which shows encapsulation?', choices: ['Leading underscore usage','Inheriting methods','Free functions','List comprehensions'], ans: 0},
      {id: 'm2q20', q: 'What happens if subclass overrides __init__ but not call super?', choices: ['Parent init runs','Parent init skipped','Error at class creation','Instance deleted'], ans: 1},
      {id: 'm2q21', q: 'How to call parent method explicitly?', choices: ['A.method(self)','super.method()','this.method()','parent.method(self)'], ans: 0},
      {id: 'm2q22', q: 'What is mixin?', choices: ['Standalone program','Class that provides methods to be reused','Type of list','Built-in module'], ans: 1},
      {id: 'm2q23', q: 'What is abstract base class used for?', choices: ['Prevent instantiation','Provide interface and enforce methods','Speed up code','Replace tests'], ans: 1},
      {id: 'm2q24', q: 'Which decorator makes class method a static method?', choices: ['@classmethod','@staticmethod','@property','@abstractmethod'], ans: 1},
      {id: 'm2q25', q: `Code output:\nclass X:\n  def __init__(self): self.v=5\n  def incr(self): self.v+=1\nx=X(); y=x; y.incr(); print(x.v)`, choices: ['5','6','Error','None'], ans: 1}
    ],

    "Module 3 - Testing & Running Time": [
      {id: 'm3q1', q: 'Which class to extend for unittest?', choices: ['unittest.TestSuite','Test.Case','unittest.Test','unittest.TestCase'], ans: 3},
      {id: 'm3q2', q: 'TDD phase writing failing tests is called?', choices: ['Refactor','Red','Green','Black'], ans: 1},
      {id: 'm3q3', q: 'Which checks exception in unittest?', choices: ['assertRaises(fn)','with self.assertRaises(IndexError): L.pop()','self.assertRaises(IndexError, L.pop)','try/except only'], ans: 1},
      {id: 'm3q4', q: 'If an algorithm is O(n^2), big-O is:', choices: ['lower bound','upper bound','exact','none'], ans: 1},
      {id: 'm3q5', q: 'Time complexity of `x in s` for a set?', choices: ['O(n)','O(log n)','O(1)','O(n log n)'], ans: 2},
      {id: 'm3q6', q: 'Nested loops i in range(n) and j in range(n):', choices: ['O(n)','O(n^2)','O(n^3)','O(log n)'], ans: 1},
      {id: 'm3q7', q: 'Creating set(L) cost?', choices: ['O(1)','O(log n)','O(n)','O(n^2)'], ans: 2},
      {id: 'm3q8', q: 'Matrix multiplication triple loop cost?', choices: ['O(n^2)','O(n log n)','O(n^3)','O(n)'], ans: 2},
      {id: 'm3q9', q: 'Unittest discovery picks method names that start with?', choices: ['Test','TEST','test','any'], ans: 2},
      {id: 'm3q10', q: 'Benefit of TDD?', choices: ['Faster initial dev','More bugs','Improved maintainability','No code reviews'], ans: 2},
      {id: 'm3q11', q: 'What is amortized O(1)?', choices: ['Always constant','Average per op over sequence','Worst-case per op','Logarithmic'], ans: 1},
      {id: 'm3q12', q: `Code output:\nL=[1,2,3]\nprint(any(L[i]==L[j] for i in range(1,3) for j in range(i)))`, choices: ['True','False','Error','Depends'], ans: 1},
      {id: 'm3q13', q: 'What is complexity of `any` with nested loops up to n?', choices: ['O(n)','O(n^2)','O(n^3)','O(log n)'], ans: 1},
      {id: 'm3q14', q: 'Which cannot be faster than O(n) for arbitrary input?', choices: ['Searching unsorted list','Searching sorted list','Hash lookup','Sum formula'], ans: 0},
      {id: 'm3q15', q: 'Which is an upper bound notation?', choices: ['Omega','Theta','Big-O','little-o'], ans: 2},
      {id: 'm3q16', q: 'What is complexity of building list by appending n times?', choices: ['O(1)','O(n)','O(n^2)','O(log n)'], ans: 1},
      {id: 'm3q17', q: 'Which approach helps catch regressions early?', choices: ['No tests','TDD','Skip tests','Manual only'], ans: 1},
      {id: 'm3q18', q: 'Which is true about nested loops where inner loop constant 5?', choices: ['O(n^2)','O(n)','O(1)','O(log n)'], ans: 1},
      {id: 'm3q19', q: 'What is complexity of slicing L[10:20]?', choices: ['O(1)','O(k) where k slice length','O(n)','O(n^2)'], ans: 1},
      {id: 'm3q20', q: `Code output:\nfor i in range(3):\n  for j in range(2):\n    print(i+j, end=' ')`, choices: ['0 1 1 2 2 3','0 1 1 2','0 1 2','Error'], ans: 1},
      {id: 'm3q21', q: 'Which data structure gives O(1) average membership?', choices: ['list','set','tuple','deque'], ans: 1},
      {id: 'm3q22', q: 'Which grows faster: n^2 or n log n?', choices: ['n log n','n^2','same','depends'], ans: 1},
      {id: 'm3q23', q: 'Binary search runs in:', choices: ['O(n)','O(log n)','O(n log n)','O(1)'], ans: 1},
      {id: 'm3q24', q: 'Which is constant-time on list?', choices: ['L.pop(0)','L.append(x)','L.insert(0,x)','L[0:10]'], ans: 1},
      {id: 'm3q25', q: 'What is complexity of concatenating two lists of sizes n and m?', choices: ['O(1)','O(n+m)','O(n*m)','O(max(n,m))'], ans: 1}
    ],

    "Module 4 - Data Structures": [
      {id: 'm4q1', q: 'Which structure follows FIFO?', choices: ['Stack','Queue','Tree','Graph'], ans: 1},
      {id: 'm4q2', q: 'Queue with list.append() and pop(0) dequeue cost?', choices: ['O(1)','O(n)','O(log n)','O(n^2)'], ans: 1},
      {id: 'm4q3', q: 'Which gives O(1) append/pop both ends?', choices: ['list','set','collections.deque','tuple'], ans: 2},
      {id: 'm4q4', q: 'Singly linked list add to end (only head) cost?', choices: ['O(1)','O(n) unless tail stored','O(log n)','O(n^2)'], ans: 1},
      {id: 'm4q5', q: 'Average lookup time in hash table/set?', choices: ['O(n)','O(log n)','O(1)','O(n log n)'], ans: 2},
      {id: 'm4q6', q: 'Traversal that gives sorted order on BST?', choices: ['Preorder','Postorder','Inorder','Level-order'], ans: 2},
      {id: 'm4q7', q: 'What happens if removefirst() on empty list without check?', choices: ['Returns None','Raises IndexError/AttributeError','May raise AttributeError','Sets head to 0'], ans: 2},
      {id: 'm4q8', q: 'Stack description?', choices: ['FIFO','LIFO','Priority-based','Hash-based'], ans: 1},
      {id: 'm4q9', q: 'Expensive for array list but cheap for linked list?', choices: ['Index access','Append end','Insert/remove middle with node pointer','Hash lookup'], ans: 2},
      {id: 'm4q10', q: 'Using addfirst()/removefirst() as queue gives?', choices: ['FIFO','LIFO','Priority','Undefined'], ans: 1},
      {id: 'm4q11', q: `Code output:\nclass Node:\n  def __init__(s,v,n=None): s.v=v; s.n=n\nhead=Node(1)\nhead.n=Node(2)\nprint(head.n.v)`, choices: ['1','2','None','Error'], ans: 1},
      {id: 'm4q12', q: 'Which is best for implementing adjacency lists?', choices: ['Array of size N*N','list/dict of lists','single list','tuple'], ans: 1},
      {id: 'm4q13', q: 'What is amortized time for appending to Python list?', choices: ['O(1)','O(n)','O(log n)','O(n^2)'], ans: 0},
      {id: 'm4q14', q: 'Which gives O(1) access by index?', choices: ['Linked list','Array/list','Deque','Dictionary'], ans: 1},
      {id: 'm4q15', q: 'What is the complexity to find max in unsorted list of n?', choices: ['O(1)','O(log n)','O(n)','O(n^2)'], ans: 2},
      {id: 'm4q16', q: 'Which structure is best for BFS?', choices: ['Stack','Queue','Heap','BST'], ans: 1},
      {id: 'm4q17', q: 'What is a heap typically used for?', choices: ['LIFO','Priority queue','Set operations','Graph traversal'], ans: 1},
      {id: 'm4q18', q: `Code output:\nL=[1,2,3]\nL2=L[:]\nL2.append(4)\nprint(L)`, choices: ['[1,2,3]','[1,2,3,4]','Error','None'], ans: 0},
      {id: 'm4q19', q: 'Which data structure supports fast lookup by key?', choices: ['list','dict','queue','stack'], ans: 1},
      {id: 'm4q20', q: 'Which traversal is level-order?', choices: ['DFS','BFS','Inorder','Preorder'], ans: 1},
      {id: 'm4q21', q: 'Which is true about singly linked list node deletion when given pointer to node?', choices: ['O(1) if you have previous','O(1) without previous','Impossible','O(n^2)'], ans: 0},
      {id: 'm4q22', q: 'Which structure best holds unique items with fast membership?', choices: ['list','set','tuple','linked list'], ans: 1},
      {id: 'm4q23', q: 'What is worst-case lookup in hash table if many collisions?', choices: ['O(1)','O(log n)','O(n)','O(n^2)'], ans: 2},
      {id: 'm4q24', q: 'Which operation on linked list is O(1)?', choices: ['Find by value','Insert after known node','Find tail without pointer','Access by index'], ans: 1},
      {id: 'm4q25', q: 'What is complexity of converting list to set of n items?', choices: ['O(1)','O(n)','O(n log n)','O(n^2)'], ans: 1}
    ]
  };

  const modules = Object.keys(fullBanks);

  // state for chosen randomized quiz for current module
  const [moduleIndex, setModuleIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]); // current randomized 10
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  // Helper: pick k random unique items from an array
  function pickRandom(arr, k){
    const copy = arr.slice();
    for(let i = copy.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      const t = copy[i]; copy[i] = copy[j]; copy[j] = t;
    }
    return copy.slice(0, k);
  }

  // initialize quizQuestions whenever module changes or when user requests new quiz
  useEffect(()=>{
    const bank = fullBanks[modules[moduleIndex]] || [];
    const k = Math.min(10, bank.length);
    setQuizQuestions(pickRandom(bank, k));
    setAnswers({});
    setSubmitted(false);
    setShowAnswers(false);
  }, [moduleIndex]);

  function tryAgain(){
    const bank = fullBanks[modules[moduleIndex]] || [];
    const k = Math.min(10, bank.length);
    setQuizQuestions(pickRandom(bank, k));
    setAnswers({});
    setSubmitted(false);
    setShowAnswers(false);
  }

  function toggleChoice(qid, choiceIdx){
    setAnswers(prev => ({...prev, [qid]: choiceIdx}));
  }

  function submit(){
    setSubmitted(true);
  }

  function score(){
    let correct = 0;
    for(const q of quizQuestions){
      if(answers[q.id] === q.ans) correct++;
    }
    return {correct, total: quizQuestions.length};
  }

  const moduleName = modules[moduleIndex];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">CSE-2050 Practice Quiz App (Randomized)</h1>
          <div className="text-sm text-slate-600">Modules: {modules.length}</div>
        </header>

        <section className="mb-6 flex gap-3 flex-wrap">
          {modules.map((m, i) => (
            <button key={m}
              onClick={() => setModuleIndex(i)}
              className={`px-3 py-1 rounded-lg border ${i===moduleIndex? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-700'}`}>
              {`Mod ${i+1}`}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            <button className="px-3 py-1 rounded-lg border bg-white" onClick={()=>{ setShowAnswers(s => !s); }}>
              {showAnswers? 'Hide Answers' : 'Show Answers'}
            </button>
            <button className="px-3 py-1 rounded-lg border bg-white" onClick={tryAgain}>Try Again (new random quiz)</button>
          </div>
        </section>

        <main>
          <h2 className="text-lg font-semibold mb-2">{moduleName} — randomized 10 questions</h2>
          <p className="text-sm text-slate-500 mb-4">Each attempt selects a new random set of questions from a larger bank. Questions include code-output items — read code carefully and choose the right output.</p>

          <ol className="space-y-4">
            {quizQuestions.map((q, idx) => (
              <li key={q.id} className="p-4 border rounded-lg bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-slate-500">Q{idx+1}</div>
                    <div className="mt-1 whitespace-pre-line font-medium">{q.q}</div>
                  </div>
                  <div className="text-sm text-slate-400">{submitted && (answers[q.id] === q.ans ? '✓' : '✕')}</div>
                </div>

                <div className="mt-3 grid gap-2">
                  {q.choices.map((c, ci) => {
                    const selected = answers[q.id] === ci;
                    const correct = q.ans === ci;
                    return (
                      <label key={ci} className={`flex items-center gap-2 p-2 rounded-md border ${selected? 'bg-sky-50 border-sky-200' : 'bg-white'} ${showAnswers && correct? 'ring-2 ring-green-200' : ''}`}>
                        <input type="radio" name={q.id} checked={selected || false} onChange={() => toggleChoice(q.id, ci)} />
                        <span className="text-sm">{c}</span>
                        {showAnswers && correct && <span className="ml-auto text-xs text-green-700">Answer</span>}
                      </label>
                    );
                  })}
                </div>

              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center gap-3">
            <button className="px-4 py-2 bg-sky-600 text-white rounded-lg" onClick={submit}>Submit</button>
            <button className="px-4 py-2 border rounded-lg" onClick={() => { setShowAnswers(true); setSubmitted(true); }}>Submit & Show Answers</button>
            <button className="px-4 py-2 border rounded-lg" onClick={tryAgain}>Try Again (new quiz)</button>

            {submitted && (
              <div className="ml-auto text-sm">
                Score: <span className="font-semibold">{score().correct}/{score().total}</span>
              </div>
            )}
          </div>

          {submitted && (
            <div className="mt-4 p-3 bg-slate-50 rounded-md text-sm text-slate-700">
              Review: {score().correct} correct out of {score().total}. Click <strong>Try Again</strong> to get a different randomized set from the module bank.
            </div>
          )}

        </main>

        <footer className="mt-6 text-xs text-slate-500">
          Improvements available: timed mode, per-question hints, progress tracking, printable export. Reply which you'd like next.
        </footer>
      </div>
    </div>
  );
}
