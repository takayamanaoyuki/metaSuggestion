const figureList = ["Triangle", "Square"] as const

export const figurePairList: 
{
    figure: (typeof figureList)[number],
    number: number
}[][]
 = [
    [
        {
            figure: "Triangle",
            number: 7
        },
        {
            figure: "Triangle",
            number: 2
        }
    ],
    [
        {
            figure: "Square",
            number: 6
        },
        {
            figure: "Square",
            number: 8
        }
    ]
]