import { test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TaskPage } from './support/pages/tasks'

test('deve cadastrar uma nova tarefa', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Ler um livro de TypeScript',
        is_done: false
    } 

    await deleteTaskByHelper(request, task.name)

    const taskPage: TaskPage = new TaskPage(page)
    await taskPage.go()
    await taskPage.create(task)
    await taskPage.shouldHaveText(task.name)
})

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    
    const task: TaskModel = {
        name: 'TESTE 001',
        is_done: false
    } 

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)
    
    const taskPage: TaskPage = new TaskPage(page)
    await taskPage.go()
    await taskPage.create(task)
    await taskPage.alertHaveText('Task already exists!')

})