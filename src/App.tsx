import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Book {
   title: string
   author: string
   summary?: string
}
const App = () => {
   const [books, setBooks] = useState<Book[]>([{ author: 'J.K. Rowling', title: 'Harry Potter', summary: 'About magic school' }])

   const { register, handleSubmit, formState, reset } = useForm<Book>()
   const { errors } = formState

   const onSubmit: SubmitHandler<Book> = (data) => setBooks([...books, data])

   useEffect(() => {
      if (formState.isSubmitSuccessful) reset()
   }, [formState, reset])

   return (
      <main className='main-container'>
         <section className='sidebar'>
            <form onSubmit={handleSubmit(onSubmit)}>
               <h1>Form</h1>
               <input type='text' placeholder='Title' {...register('title', { required: true })} />
               {errors.title && <p>{errors.title.message}</p>}
               <input type='text' placeholder='Author' {...register('author', { required: true })} />
               {errors.author && <p>{errors.author.message}</p>}
               <input type='text' placeholder='Summary' {...register('summary')} />
               <input type='submit' value='Submit' />
            </form>
         </section>
         <section className='content'>
            <table>
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Author</th>
                     <th>Summary</th>
                  </tr>
               </thead>
               <tbody>
                  {books.map((book, index) => (
                     <tr key={book.title + index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.summary}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </section>
      </main>
   )
}

export default App
